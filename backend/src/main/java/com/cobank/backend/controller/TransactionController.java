package com.cobank.backend.controller;

import com.cobank.backend.dto.TransferRequest;
import com.cobank.backend.dto.response.TransactionResponse;
import com.cobank.backend.services.TransactionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) { this.transactionService = transactionService; }

    @PostMapping("/transfer")
    public TransactionResponse registerTransaction(@RequestBody TransferRequest req) {
        return transactionService.registerTransaction(req);
    }

    @GetMapping("/balance/{iban}")
    public TransactionResponse balance(@PathVariable String iban) {
        return transactionService.balance(iban);
    }


}
