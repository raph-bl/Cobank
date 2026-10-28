package com.cobank.backend.services;

import com.cobank.backend.model.Account;
import com.cobank.backend.model.CustomerProfile;
import com.cobank.backend.repository.AccountRepository;
import com.cobank.backend.utils.IbanUtils;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.cobank.backend.dto.RegisterRequest;
import com.cobank.backend.dto.response.RegisterResponse;
import com.cobank.backend.dto.response.LoginResponse;
import com.cobank.backend.model.User;
import com.cobank.backend.repository.UserRepository;
import com.cobank.backend.dto.LoginRequest;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, AccountRepository accountRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.accountRepository = accountRepository;
    }

    public LoginResponse login(LoginRequest req) {
        Optional<User> userOpt = userRepository.findByEmail(req.getEmail());

        if(userOpt.isEmpty()) {
            return new LoginResponse("error", "User not found");
        }

        User user = userOpt.get();

        boolean passwordMatches = passwordEncoder.matches(req.getPassword(), user.getPassword());

        if(!passwordMatches) {
            return new LoginResponse("error", "Invalid creds");
        }

        CustomerProfile profile = user.getProfile();

        return new LoginResponse(
                "success",
                "Login successful",
                profile != null ? profile.getFirstName() : null,
                profile != null ? profile.getLastName() : null
        );
    }
    
    public RegisterResponse register(RegisterRequest req) {

        System.out.println(
            "---\n Registering new user:\n---\nFirstname: " + "\nPhone: " + req.getPhoneNumber() + "\nE-mail: " + req.getEmail() +
            "\nPassword: " + req.getPassword()
        );

        User user = new User();
        CustomerProfile profile = new CustomerProfile();
        Account acc = new Account();
        String hashedPassword = passwordEncoder.encode(req.getPassword());

        user.setEmail(req.getEmail());
        user.setPassword(hashedPassword);
        profile.setFirstName(req.getFirstName());
        profile.setLastName(req.getLastName());
        profile.setPhoneNumber(req.getPhoneNumber());
        profile.setCountry(req.getCountry());
        profile.setCity(req.getCity());
        user.setProfile(profile);
        acc.setUser(user);
        acc.setIban(IbanUtils.generate());

        userRepository.save(user);
        accountRepository.save(acc);

        return new RegisterResponse("success", "User created in db!");  
    }
}
