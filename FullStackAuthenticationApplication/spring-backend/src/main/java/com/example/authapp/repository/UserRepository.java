package com.example.authapp.repository;

import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.authapp.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    
    // Change from findByDescriptionContaining to:
    Optional<User> findByProjectDescriptionContaining(String projectDescription);
    
    List<User> findByProjectNameIsNotNull();
}