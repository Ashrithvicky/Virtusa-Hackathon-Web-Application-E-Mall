package com.example.EMPM.model;
import lombok.Data;

@Data
public class SignupRequest {
    private String name;
    private String email;
    private String password;
    private String role; // "USER" or "OWNER"
}
