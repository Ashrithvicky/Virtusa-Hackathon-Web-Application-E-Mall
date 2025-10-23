package com.example.EMPM.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate bookingDate;

    private boolean active = true;

    @ManyToOne
    @JoinColumn(name = "space_id")
    private Space space;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
