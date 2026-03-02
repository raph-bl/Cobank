package com.cobank.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "accounts")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String iban;

    @Enumerated(EnumType.STRING)
    @Column(unique = false)
    private AccountStatus status = AccountStatus.ACTIVE;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Account() {}
    
    public Long getId()                         { return id; }
    public String getIban()                     { return iban; }
    public AccountStatus getStatus()            { return status; }    
    public User getUser()                       { return user; }

    public void setIban(String iban)            { this.iban = iban; }
    public void setStatus(AccountStatus status) { this.status = status; }
    public void setUser(User user)              { this.user = user; }

}