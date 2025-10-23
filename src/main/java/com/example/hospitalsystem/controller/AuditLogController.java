package com.example.hospitalsystem.controller;

import com.example.hospitalsystem.model.AuditLog;
import com.example.hospitalsystem.repository.AuditLogRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class AuditLogController {

    private final AuditLogRepository auditLogRepository;

    public AuditLogController(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @GetMapping("/api/auditoria")
    public List<AuditLog> listarAuditoria() {
        return (List<AuditLog>) auditLogRepository.findAll();
    }
}
