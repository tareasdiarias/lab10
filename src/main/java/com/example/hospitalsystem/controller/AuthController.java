package com.example.hospitalsystem.controller;

import com.example.hospitalsystem.model.Role;
import com.example.hospitalsystem.model.User;
import com.example.hospitalsystem.repository.RoleRepository;
import com.example.hospitalsystem.repository.UserRepository;
import com.example.hospitalsystem.security.JwtService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    // ⭐ LOGIN CON DNI
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        System.out.println("🔐 Intento de login recibido");
        System.out.println("   - DNI recibido: " + request.getDni());

        try {
            if (request.getDni() == null || !request.getDni().matches("\\d{8}")) {
                return ResponseEntity.badRequest().body(new ErrorResponse("DNI debe tener 8 dígitos"));
            }

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getDni(), request.getPassword())
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtService.generateToken(userDetails);

            List<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            User user = userRepository.findByDni(request.getDni())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            return ResponseEntity.ok(LoginResponse.builder()
                    .token(token)
                    .username(user.getUsername())
                    .dni(user.getDni())
                    .email(user.getEmail())
                    .roles(roles)
                    .message("Login exitoso")
                    .build());

        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ErrorResponse("DNI o contraseña incorrectos"));
        }
    }

    // ⭐ REGISTRO PÚBLICO (solo DOCTOR y RECEPCIONISTA)
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            if (request.getDni() == null || !request.getDni().matches("\\d{8}")) {
                return ResponseEntity.badRequest().body(new ErrorResponse("DNI debe tener exactamente 8 dígitos"));
            }

            if (!request.getRole().equalsIgnoreCase("DOCTOR") &&
                    !request.getRole().equalsIgnoreCase("RECEPCIONISTA")) {
                return ResponseEntity.badRequest().body(new ErrorResponse("Solo puedes registrarte como Doctor o Recepcionista"));
            }

            if (userRepository.existsByDni(request.getDni())) {
                return ResponseEntity.badRequest().body(new ErrorResponse("Este DNI ya está registrado"));
            }

            if (userRepository.existsByUsername(request.getUsername())) {
                return ResponseEntity.badRequest().body(new ErrorResponse("Este nombre de usuario ya existe"));
            }

            if (userRepository.existsByEmail(request.getEmail())) {
                return ResponseEntity.badRequest().body(new ErrorResponse("Este email ya está registrado"));
            }

            User user = new User();
            user.setDni(request.getDni());
            user.setUsername(request.getUsername());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setEnabled(true);

            String roleName = "ROLE_" + request.getRole().toUpperCase();
            Role role = roleRepository.findByName(roleName)
                    .orElseThrow(() -> new RuntimeException("Rol no encontrado: " + roleName));

            user.getRoles().add(role); // ✅ para PostgreSQL (relación @ManyToMany)
            User savedUser = userRepository.save(user);

            return ResponseEntity.ok(RegisterResponse.builder()
                    .message("Usuario registrado exitosamente")
                    .username(savedUser.getUsername())
                    .dni(savedUser.getDni())
                    .email(savedUser.getEmail())
                    .role(request.getRole())
                    .build());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new ErrorResponse("Error al registrar: " + e.getMessage()));
        }
    }

    // Otros endpoints: check-dni, validate, test-db, generate-hash (igual)
    // No necesitan cambios para PostgreSQL, funcionan igual.

    // ===== DTOs =====
    @Data @NoArgsConstructor @AllArgsConstructor
    public static class LoginRequest {
        private String dni;
        private String password;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class LoginResponse {
        private String token;
        private String username;
        private String dni;
        private String email;
        private List<String> roles;
        private String message;
    }

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class RegisterRequest {
        private String dni;
        private String username;
        private String email;
        private String password;
        private String role;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class RegisterResponse {
        private String message;
        private String username;
        private String dni;
        private String email;
        private String role;
    }

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class ErrorResponse {
        private String error;
    }

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class MessageResponse {
        private String message;
    }
}
