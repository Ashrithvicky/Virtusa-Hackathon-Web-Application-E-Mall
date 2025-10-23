package com.example.authapp.service;

import java.util.Optional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.authapp.model.User;
import com.example.authapp.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // User management methods
    public User register(User user) {
        return userRepository.save(user);
    }

    public Optional<User> login(String username, String password) {
        return userRepository.findByUsername(username)
                .filter(u -> u.getPassword().equals(password));
    }

    

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean resetPassword(String username, String newPassword) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setPassword(newPassword);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    // Project-related methods
    public Optional<User> findUserByProjectDescription(String description) {
        return userRepository.findByProjectDescriptionContaining(description);
    }

    public Optional<String> getProjectDescriptionByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(User::getProjectDescription);
    }

    public User updateUserProject(Long userId, String name, String description) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setProjectName(name);  // Make sure these match your User entity
        user.setProjectDescription(description);
        return userRepository.save(user);
    }

    public User updateProjectDescription(String username, String projectDescription) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
        user.setProjectDescription(projectDescription);
        return userRepository.save(user);
    }

    public List<User> getAllUsersWithProjects() {
        return userRepository.findByProjectNameIsNotNull();
    }
}