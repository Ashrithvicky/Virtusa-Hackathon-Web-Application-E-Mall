package com.example.EMPM.service;

import com.example.EMPM.model.User;

import java.util.Optional;

public interface UserService {
    Optional<User> findByEmail(String email);
    User saveUser(User user);
    Optional<User> getUserById(Long id);
}
