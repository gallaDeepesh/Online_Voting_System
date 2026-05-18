package secure_voting_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import secure_voting_backend.dto.LoginRequest;
import secure_voting_backend.dto.RegisterRequest;
import secure_voting_backend.entity.User;
import secure_voting_backend.repository.UserRepository;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register User
    public String register(RegisterRequest request) {

        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already registered";
        }

        // Create new user
        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        // Hash password before saving
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        // Save user
        userRepository.save(user);

        return "User registered successfully";
    }

    // Login User
    public String login(LoginRequest request) {

        // Find user by email
        Optional<User> optionalUser =
                userRepository.findByEmail(request.getEmail());

        // User not found
        if (optionalUser.isEmpty()) {
            return "Invalid email or password";
        }

        User user = optionalUser.get();

        // Compare passwords
        boolean isMatch = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!isMatch) {
            return "Invalid email or password";
        }

        return "Login successful";
    }
}