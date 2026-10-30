package com.cobank.backend.services;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cobank.backend.dto.TransferRequest;
import com.cobank.backend.dto.response.TransactionResponse;
import com.cobank.backend.model.Account;
import com.cobank.backend.model.LedgerEntry;
import com.cobank.backend.model.Transaction;
import com.cobank.backend.model.enums.AccountStatus;
import com.cobank.backend.model.enums.EntryType;
import com.cobank.backend.model.enums.TxType;
import com.cobank.backend.repository.AccountRepository;
import com.cobank.backend.repository.LedgerRepository;
import com.cobank.backend.repository.TransactionRepository;

@Service
public class TransactionService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final LedgerRepository ledgerRepository;

    public TransactionService(AccountRepository accountRepository,
                              TransactionRepository transactionRepository,
                              LedgerRepository ledgerRepository) {
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
        this.ledgerRepository = ledgerRepository;
    }

    @Transactional
    public TransactionResponse registerTransaction(TransferRequest req) {

        if (req.getSourceIban() == null || req.getDestIban() == null || req.getAmount() == null) {
            return new TransactionResponse("error", "Missing sourceIban, destIban or amount");
        }

        Optional<Account> sourceOpt = accountRepository.findByIban(req.getSourceIban());
        if (sourceOpt.isEmpty()) {
            return new TransactionResponse("error", "Source account not found");
        }

        Optional<Account> destOpt = accountRepository.findByIban(req.getDestIban());
        if (destOpt.isEmpty()) {
            return new TransactionResponse("error", "Destination account not found");
        }

        Account source = sourceOpt.get();
        Account dest = destOpt.get();

        BigDecimal balance = ledgerRepository.computeBalance(source.getId());

        /*
         * Point d'insertion du service COBOL : cette décision sera déléguée à
         * CHKTRF, qui recevra (amount, balance, statuts) et renverra un code
         * retour. En attendant, les mêmes règles sont appliquées en Java.
         */
        String rejection = check(source, dest, req.getAmount(), balance);
        if (rejection != null) {
            return new TransactionResponse("error", rejection);
        }

        BigDecimal amount = req.getAmount().setScale(2);

        Transaction tx = new Transaction();
        tx.setType(TxType.TRANSFER);
        transactionRepository.save(tx);

        ledgerRepository.save(entry(source, tx, EntryType.DEBIT, amount));
        ledgerRepository.save(entry(dest, tx, EntryType.CREDIT, amount));

        return new TransactionResponse(
                "success",
                "Transfer completed",
                tx.getId(),
                balance.subtract(amount)
        );
    }

    @Transactional(readOnly = true)
    public TransactionResponse balance(String iban) {
        Optional<Account> accOpt = accountRepository.findByIban(iban);

        if (accOpt.isEmpty()) {
            return new TransactionResponse("error", "Account not found");
        }

        return new TransactionResponse(
                "success",
                "Balance retrieved",
                null,
                ledgerRepository.computeBalance(accOpt.get().getId())
        );
    }

    /** Renvoie le motif de rejet, ou null si le virement est autorisé. */
    private String check(Account source, Account dest, BigDecimal amount, BigDecimal balance) {

        if (source.getId().equals(dest.getId())) {
            return "Source and destination must differ";
        }

        if (amount.signum() <= 0) {
            return "Amount must be positive";
        }

        if (amount.stripTrailingZeros().scale() > 2) {
            return "Amount must not exceed 2 decimal places";
        }

        if (source.getStatus() != AccountStatus.ACTIVE) {
            return "Source account is not active";
        }

        if (dest.getStatus() != AccountStatus.ACTIVE) {
            return "Destination account is not active";
        }

        if (balance.compareTo(amount) < 0) {
            return "Insufficient funds";
        }

        return null;
    }

    private LedgerEntry entry(Account acc, Transaction tx, EntryType type, BigDecimal amount) {
        LedgerEntry e = new LedgerEntry();

        e.setAccount(acc);
        e.setTx(tx);
        e.setType(type);
        e.setAmount(amount);

        return e;
    }
}
