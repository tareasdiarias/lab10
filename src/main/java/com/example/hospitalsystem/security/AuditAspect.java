package com.example.hospitalsystem.security;

import com.example.hospitalsystem.model.AuditLog;
import com.example.hospitalsystem.repository.AuditLogRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Aspect
@Component
public class AuditAspect {

    private static final Logger logger = LoggerFactory.getLogger(AuditAspect.class);

    @Autowired
    private AuditLogRepository auditLogRepository;

    private final ObjectMapper objectMapper;

    public AuditAspect() {
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
    }

    @Around("@annotation(auditable)")
    public Object auditMethod(ProceedingJoinPoint joinPoint, Auditable auditable) throws Throwable {

        AuditLog auditLog = new AuditLog();

        // Obtener información del usuario
        String usuario = obtenerUsuarioActual();
        String rol = obtenerRolActual();
        String ipAddress = obtenerIpAddress();

        auditLog.setUsuario(usuario);
        auditLog.setRol(rol);
        auditLog.setAccion(auditable.accion());
        auditLog.setEntidad(auditable.entidad());
        auditLog.setIpAddress(ipAddress);
        auditLog.setFechaHora(LocalDateTime.now());

        // Capturar datos de entrada
        Object[] args = joinPoint.getArgs();
        String datosNuevos = convertirAJson(args);
        auditLog.setDatosNuevos(datosNuevos);

        Object result = null;

        try {
            // Ejecutar el método original
            result = joinPoint.proceed();

            auditLog.setResultado("SUCCESS");

            // Extraer ID del resultado si existe
            if (result != null) {
                String entidadId = extraerIdDeResultado(result);
                auditLog.setEntidadId(entidadId);
            }

            // Crear descripción
            String descripcion = String.format("Usuario %s (%s) realizó %s en %s desde IP %s",
                    usuario, rol, auditable.accion(), auditable.entidad(), ipAddress);
            auditLog.setDescripcion(descripcion);

            logger.info("✅ Auditoría: {} - {} - {}", usuario, auditable.accion(), auditable.entidad());

        } catch (Exception e) {
            auditLog.setResultado("ERROR");
            auditLog.setMensajeError(e.getMessage());

            String descripcion = String.format("ERROR: Usuario %s intentó %s en %s - Error: %s",
                    usuario, auditable.accion(), auditable.entidad(), e.getMessage());
            auditLog.setDescripcion(descripcion);

            logger.error("❌ Error en auditoría: {}", e.getMessage());

            throw e; // Re-lanzar la excepción
        } finally {
            guardarAuditoriaIndependiente(auditLog); // SIEMPRE intenta guardar, incluso si hay error
        }

        return result;
    }

    // Este método SIEMPRE se ejecuta en una transacción nueva
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void guardarAuditoriaIndependiente(AuditLog auditLog) {
        try {
            auditLogRepository.save(auditLog);
        } catch (Exception e) {
            logger.error("No se pudo guardar la auditoría: {}", e.getMessage());
        }
    }

    private String obtenerUsuarioActual() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            return auth != null ? auth.getName() : "SYSTEM";
        } catch (Exception e) {
            return "SYSTEM";
        }
    }

    private String obtenerRolActual() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.getAuthorities() != null) {
                return auth.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.joining(","));
            }
        } catch (Exception e) {
            logger.warn("No se pudo obtener el rol del usuario");
        }
        return "UNKNOWN";
    }

    private String obtenerIpAddress() {
        try {
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            if (attributes != null) {
                HttpServletRequest request = attributes.getRequest();
                String ip = request.getHeader("X-Forwarded-For");
                if (ip == null || ip.isEmpty()) {
                    ip = request.getRemoteAddr();
                }
                return ip;
            }
        } catch (Exception e) {
            logger.warn("No se pudo obtener la IP del usuario");
        }
        return "UNKNOWN";
    }

    private String convertirAJson(Object obj) {
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            return "Error al serializar: " + e.getMessage();
        }
    }

    private String extraerIdDeResultado(Object result) {
        try {
            if (result.getClass().getMethod("getId") != null) {
                Object id = result.getClass().getMethod("getId").invoke(result);
                return id != null ? id.toString() : null;
            }
        } catch (Exception e) {
            // No hacer nada, es normal que algunos métodos no retornen una entidad
        }
        return null;
    }
}
