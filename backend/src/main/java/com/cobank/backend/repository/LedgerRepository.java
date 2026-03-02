package com.cobank.backend.repository;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import com.cobank.backend.model.LedgerEntry;

public interface LedgerRepository 
    extends JpaRepository<LedgerEntry, Long> {
    @Query("""
        SELECT COALESCE(SUM(
            CASE
                WHEN e.type = 'CREDIT' THEN e.amnt
                ELSE -e.amnt
            END
        ), 0)
        FROM LedgerEntry e
        WHERE e.acc.id = :accountId
    """)
    BigDecimal computeBalance(
            @Param("accountId") Long accountId
    );
}
