package com.example.authapp.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.authapp.model.User;
import com.example.authapp.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    // User authentication endpoints
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        Optional<User> existingUser = userService.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists.");
        }
        return ResponseEntity.ok(userService.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> creds) {
        Map<String, Object> response = new HashMap<>();
        try {
            if (creds == null || creds.get("username") == null || creds.get("password") == null) {
                response.put("success", false);
                response.put("message", "Username and password are required");
                return ResponseEntity.badRequest().body(response);
            }

            Optional<User> userOpt = userService.login(creds.get("username"), creds.get("password"));
            
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                response.put("success", true);
                response.put("user", user);
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Invalid credentials");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Login failed: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PostMapping("/forgot")
    public String forgotPassword(@RequestBody Map<String, String> body) {
        return userService.resetPassword(body.get("username"), body.get("newPassword")) 
                ? "Password reset successful." 
                : "User not found.";
    }

    // Project-related endpoints
    @PatchMapping("/update-project-description")
    public Map<String, Object> updateProjectDescription(@RequestBody Map<String, String> body) {
        Map<String, Object> response = new HashMap<>();
        try {
            User updatedUser = userService.updateProjectDescription(
                body.get("username"), 
                body.get("projectDescription")
            );
            response.put("success", true);
            response.put("message", "Project description updated");
            response.put("user", updatedUser);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error updating project description");
        }
        return response;
    }

    @GetMapping("/project-description")
    public Map<String, Object> getProjectDescription(@RequestParam String username) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<String> description = userService.getProjectDescriptionByUsername(username);
            if (description.isPresent()) {
                response.put("success", true);
                response.put("projectDescription", description.get());
            } else {
                response.put("success", false);
                response.put("message", "User not found");
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching project description");
        }
        return response;
    }

    @GetMapping("/with-projects")
    public ResponseEntity<List<User>> getUsersWithProjects() {
        return ResponseEntity.ok(userService.getAllUsersWithProjects());
    }

    @PostMapping("/{userId}/project")
    public ResponseEntity<Map<String, Object>> addUserProject(
        @PathVariable Long userId,
        @RequestBody Map<String, String> projectData) {
        
        Map<String, Object> response = new HashMap<>();
        try {
            User updatedUser = userService.updateUserProject(
                userId,
                projectData.get("name"),  // Changed from projectName to name
                projectData.get("description")  // Changed from projectDescription to description
            );
            response.put("success", true);
            response.put("user", updatedUser);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to add project: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}