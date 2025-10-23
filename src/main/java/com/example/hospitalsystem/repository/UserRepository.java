package com.example.hospitalsystem.repository;

import com.example.hospitalsystem.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByDni(String dni);  // ⭐ NUEVO
    Optional<User> findByEmail(String email);  // ⭐ NUEVO

    Boolean existsByUsername(String username);
    Boolean existsByDni(String dni);  // ⭐ NUEVO
    Boolean existsByEmail(String email);  // ⭐ NUEVO
}
