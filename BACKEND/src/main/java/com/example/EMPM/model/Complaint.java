package com.example.EMPM.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "complaints")
@Data // 💡 This generates getters, setters, toString, equals, hashCode
@AllArgsConstructor
@NoArgsConstructor
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String user;
    private String text;
    private LocalDate date;
    private boolean resolved;
    private String category;
}
