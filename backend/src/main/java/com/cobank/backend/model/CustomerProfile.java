package com.cobank.backend.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.cobank.backend.model.enums.KycStatus;

import jakarta.persistence.*;

@Entity
@Table(name="customer_profiles")
public class CustomerProfile {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String firstName;

    @Column(nullable=false)
    private String lastName;
    
    @Column(nullable = true)
    private LocalDate birthDate;
    
    @Column(nullable=true)
    private String country;
    
    @Column(nullable=true)
    private String city;
    
    @Column(nullable=true)
    private String addressLine1;

    private String addressLine2; 

    @Column(nullable=true)
    private String zipCode;

    @Column(nullable=true)
    private String phoneNumber;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    private KycStatus kycStatus = KycStatus.PENDING;
    // VERIFIED / PENDING / REJECTED / SUSPENDED

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    public CustomerProfile() {}

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId()                         { return id; }
    public String getFirstName()                { return firstName; }
    public String getLastName()                 { return lastName; }
    public LocalDate getBirthDate()             { return birthDate; }
    public String getAddressLine1()             { return addressLine1; }
    public String getAddressLine2()             { return addressLine2; }
    public String getCountry()                  { return country; }
    public String getCity()                     { return city; }
    public String getZipCode()                  { return zipCode; }
    public String getPhoneNumber()              { return phoneNumber; }
    public KycStatus getKycStatus()             { return kycStatus; }
    
    public void setId(Long id)                          { this.id = id; }
    public void setFirstName(String firstName)          { this.firstName = firstName; }
    public void setLastName(String lastName)            { this.lastName = lastName; }
    public void setBirthDate(LocalDate birthDate)       { this.birthDate = birthDate; }
    public void setAddressLine1(String addressLine1)    { this.addressLine1 = addressLine1; }
    public void setAddressLine2(String addressLine2)    { this.addressLine2 = addressLine2; }
    public void setCountry(String country)              { this.country = country; }
    public void setCity(String city)                    { this.city = city; }
    public void setZipCode(String zipCode)              { this.zipCode = zipCode; }
    public void setPhoneNumber(String phoneNumber)      { this.phoneNumber = phoneNumber; }
    public void setKycStatus(KycStatus kycStatus)       { this.kycStatus = kycStatus; }

}