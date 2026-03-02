package com.cobank.backend.model;

import java.time.LocalDateTime;
import java.util.UUID;

import com.cobank.backend.model.enums.TxType;

import jakarta.persistence.*;

@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    private UUID id;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TxType type;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Transaction() {
        this.id = UUID.randomUUID();
    }

    public UUID getId() { return id; }
    public TxType getType() { return type; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setType(TxType type) { this.type = type; } 

}
