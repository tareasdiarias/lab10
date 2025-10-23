package com.example.hospitalsystem.security;

import com.example.hospitalsystem.model.User;
import com.example.hospitalsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    // ⚡️ Autenticación por DNI
    @Override
    public UserDetails loadUserByUsername(String dni) throws UsernameNotFoundException {
        System.out.println("===============================================");
        System.out.println("🔍 Intentando autenticar usuario por DNI: " + dni);

        User user = userRepository.findByDni(dni)
                .orElseThrow(() -> {
                    System.out.println("❌ Usuario NO encontrado en BD: " + dni);
                    return new UsernameNotFoundException("Usuario no encontrado: " + dni);
                });

        System.out.println("✅ Usuario ENCONTRADO en BD");
        System.out.println("   - DNI: " + user.getDni());
        System.out.println("   - Email: " + user.getEmail());
        System.out.println("   - Enabled: " + user.isEnabled());
        System.out.println("   - Password Hash (primeros 20 chars): " + user.getPassword().substring(0, 20) + "...");

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getDni()) // El username será el DNI
                .password(user.getPassword())
                .authorities(user.getRoles().stream()
                        .map(role -> new SimpleGrantedAuthority(role.getName())) // CORRECCIÓN: obtener el nombre del rol
                        .collect(Collectors.toList()))
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(!user.isEnabled())
                .build();
    }
}
