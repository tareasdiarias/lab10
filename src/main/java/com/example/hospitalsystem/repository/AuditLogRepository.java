package com.example.hospitalsystem.repository;

import com.example.hospitalsystem.model.AuditLog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AuditLogRepository extends CrudRepository<AuditLog, Long> {

    List<AuditLog> findByUsuario(String usuario);

    List<AuditLog> findByEntidad(String entidad);

    List<AuditLog> findByAccion(String accion);

    List<AuditLog> findByFechaHoraBetween(LocalDateTime inicio, LocalDateTime fin);

    List<AuditLog> findByUsuarioAndFechaHoraBetween(String usuario, LocalDateTime inicio, LocalDateTime fin);

    List<AuditLog> findByEntidadAndAccion(String entidad, String accion);
}
