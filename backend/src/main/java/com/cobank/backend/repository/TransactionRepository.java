package com.cobank.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cobank.backend.model.Transaction;

public interface TransactionRepository 
    extends JpaRepository<Transaction, UUID> {
    
}
