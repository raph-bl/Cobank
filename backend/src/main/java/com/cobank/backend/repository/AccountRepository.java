package com.cobank.backend.repository;

import com.cobank.backend.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    List<Account> findByUserId(Long userId);

    Optional<Account> findByIban(String iban);

    boolean existsByIban(String iban);
}
