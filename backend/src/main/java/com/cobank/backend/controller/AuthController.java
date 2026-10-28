package com.cobank.backend.controller;

import org.springframework.web.bind.annotation.*;
import com.cobank.backend.dto.RegisterRequest;
import com.cobank.backend.services.AuthService;
import com.cobank.backend.dto.response.RegisterResponse;
import com.cobank.backend.dto.LoginRequest;
import com.cobank.backend.dto.response.LoginResponse;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public RegisterResponse register(@RequestBody RegisterRequest req) {
        return authService.register(req);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req) {
        return authService.login(req);
    }
}
