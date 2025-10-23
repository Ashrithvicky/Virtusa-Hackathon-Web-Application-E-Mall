package com.example.EMPM.controller;

import com.example.EMPM.dto.PasswordResetRequest;
import com.example.EMPM.model.User;
import com.example.EMPM.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/reset-password")

    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetRequest request) {
        // Debug log to see the request data
        System.out.println("📨 Request received:");
        System.out.println("Email: " + request.getEmail());
        System.out.println("New Password: " + request.getNewPassword());
        System.out.println("Confirm Password: " + request.getConfirmPassword());

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Passwords do not match.");
        }

        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found with this email.");
        }

        User user = optionalUser.get();
        user.setPassword(request.getNewPassword());
        userRepository.save(user);

        return ResponseEntity.ok("✅ Password updated successfully.");
    }

}
