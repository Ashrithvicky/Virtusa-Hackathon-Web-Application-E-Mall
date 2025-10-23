// src/main/java/com/example/EMPM/dto/PasswordResetRequest.java
package com.example.EMPM.dto;

public class PasswordResetRequest {
    private String email;
    private String newPassword;
    private String confirmPassword;

    // Getters & Setters
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getNewPassword() {
        return newPassword;
    }
    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }
    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
