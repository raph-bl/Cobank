package com.cobank.backend.dto.response;

import java.math.BigDecimal;
import java.util.UUID;

public class TransactionResponse {
    private String status;
    private String message;
    private UUID txId;
    private BigDecimal balance;

    /** Échec : pas de transaction ni de solde à renvoyer. */
    public TransactionResponse(String status, String message) {
        this.status = status;
        this.message = message;
    }

    public TransactionResponse(String status, String message, UUID txId, BigDecimal balance) {
        this.status = status;
        this.message = message;
        this.txId = txId;
        this.balance = balance;
    }

    public String getStatus()         { return status; }
    public String getMessage()        { return message; }
    public UUID getTxId()             { return txId; }
    public BigDecimal getBalance()    { return balance; }

    public void setStatus(String status)          { this.status = status; }
    public void setMessage(String message)        { this.message = message; }
    public void setTxId(UUID txId)                { this.txId = txId; }
    public void setBalance(BigDecimal balance)    { this.balance = balance; }
}
