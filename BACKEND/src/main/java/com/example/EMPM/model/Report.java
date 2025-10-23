package com.example.EMPM.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;              // e.g., "Booking", "Payment", etc.

    private String description;

    private LocalDate date;

    private String generatedBy;       // Could be "owner", or specific username
}

