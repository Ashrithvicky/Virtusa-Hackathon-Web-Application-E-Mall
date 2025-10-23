package com.example.EMPM.repository;

import com.example.EMPM.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); // For login/email lookup
    User findByEmail(String email);
}
