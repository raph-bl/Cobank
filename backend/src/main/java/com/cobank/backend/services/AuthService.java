package com.cobank.backend.services;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.cobank.backend.dto.RegisterRequest;
import com.cobank.backend.dto.response.RegisterResponse;
import com.cobank.backend.model.User;
import com.cobank.backend.repository.UserRepository;
import com.cobank.backend.dto.LoginRequest;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public RegisterResponse login(LoginRequest req) {
        Optional<User> userOpt = userRepository.findByEmail(req.getEmail());

        if(userOpt.isEmpty()) {
            return new RegisterResponse("error", "User not found");
        }
        
        User user = userOpt.get();

        boolean passwordMatches = passwordEncoder.matches(req.getPassword(), user.getPassword());

        if(!passwordMatches) {
            return new RegisterResponse("error", "Invalid creds");
        }

        return new RegisterResponse("success","Login successful");
    }
    
    public RegisterResponse register(RegisterRequest req) {
        
        /*
        System.out.println(
            "---\n Registering new user:\n---\nFirstname: " + req.getFirstname() + "\nLastname: " + req.getLastname() + "\nPhone: " + req.getPhoneNumber() + "\nE-mail: " + req.getEmail() +
            "\nPassword: " + req.getPassword()  
        );
        */
        // User user = new User();
        // user.setFirstname(req.getFirstName());
        // user.setLastname(req.getLastName());        
        // user.setEmail(req.getEmail());
        // user.setPhoneNumber(req.getPhoneNumber());
        
        // String hashedPassword = passwordEncoder.encode(req.getPassword());
        // user.setPassword(hashedPassword);

        // userRepository.save(user);

        return new RegisterResponse("success", "User created in db!");  
    }
}
