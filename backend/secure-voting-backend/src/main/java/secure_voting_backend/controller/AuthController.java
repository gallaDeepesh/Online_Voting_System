package secure_voting_backend.controller;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import secure_voting_backend.dto.LoginRequest;
import secure_voting_backend.dto.RegisterRequest;
import secure_voting_backend.security.JwtUtil;
import secure_voting_backend.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private AuthenticationManager authenticationManager;

    // Register API
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest request) {

        String response = authService.register(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Login API
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest request) {

        Authentication authentication = authenticationManager.authenticate (
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        String token = JwtUtil.generateToken(request.getEmail());

        return ResponseEntity.ok(token);
    }
}