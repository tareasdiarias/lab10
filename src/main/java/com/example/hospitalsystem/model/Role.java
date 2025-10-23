package com.example.hospitalsystem.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // En PostgreSQL usamos Long para claves autogeneradas

    @Column(name = "name", nullable = false, unique = true)
    private String name;
}
