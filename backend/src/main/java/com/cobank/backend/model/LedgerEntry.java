package com.cobank.backend.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.cobank.backend.model.enums.EntryType;

import jakarta.persistence.*;

@Entity
@Table(name = "ledger_entries")
public class LedgerEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * FK -> accounts.id
     */
    @ManyToOne(optional = false)
    @JoinColumn(name = "account_id", updatable = false)
    private Account acc;

    /*
     * FK -> transactions.id
     */
    @ManyToOne(optional = false)
    @JoinColumn(name = "transaction_id", updatable = false)
    private Transaction tx;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EntryType type;

    @Column(nullable = false, precision =  18, scale = 2)
    private BigDecimal amnt;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();


    public long getId() { return id; }
    public Account getAccount() { return acc; }
    public Transaction getTx() { return tx; }
    public EntryType getType() { return type; }
    public BigDecimal getAmount() { return amnt; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setAccount(Account acc) { this.acc = acc; }
    public void setTx(Transaction tx) { this.tx = tx; }
    public void setType(EntryType type) { this.type = type; }
    public void setAmount(BigDecimal amnt) { this.amnt = amnt; } 

}
