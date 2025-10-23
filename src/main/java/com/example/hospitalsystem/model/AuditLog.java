package com.example.hospitalsystem.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "auditoria")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario")
    private String usuario;

    @Column(name = "rol")
    private String rol;

    @Column(name = "accion")
    private String accion; // CREATE, UPDATE, DELETE, READ

    @Column(name = "entidad")
    private String entidad; // Paciente, Medico, Consulta, etc.

    @Column(name = "entidad_id")
    private String entidadId;

    @Column(name = "descripcion", length = 1000)
    private String descripcion;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "fecha_hora")
    private LocalDateTime fechaHora;

    @Column(name = "datos_anteriores", columnDefinition = "TEXT")
    private String datosAnteriores;

    @Column(name = "datos_nuevos", columnDefinition = "TEXT")
    private String datosNuevos;

    @Column(name = "resultado")
    private String resultado; // SUCCESS o ERROR

    @Column(name = "mensaje_error", columnDefinition = "TEXT")
    private String mensajeError;

    // Constructor vacío
    public AuditLog() {
        this.fechaHora = LocalDateTime.now();
        this.resultado = "SUCCESS";
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getAccion() {
        return accion;
    }

    public void setAccion(String accion) {
        this.accion = accion;
    }

    public String getEntidad() {
        return entidad;
    }

    public void setEntidad(String entidad) {
        this.entidad = entidad;
    }

    public String getEntidadId() {
        return entidadId;
    }

    public void setEntidadId(String entidadId) {
        this.entidadId = entidadId;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public LocalDateTime getFechaHora() {
        return fechaHora;
    }

    public void setFechaHora(LocalDateTime fechaHora) {
        this.fechaHora = fechaHora;
    }

    public String getDatosAnteriores() {
        return datosAnteriores;
    }

    public void setDatosAnteriores(String datosAnteriores) {
        this.datosAnteriores = datosAnteriores;
    }

    public String getDatosNuevos() {
        return datosNuevos;
    }

    public void setDatosNuevos(String datosNuevos) {
        this.datosNuevos = datosNuevos;
    }

    public String getResultado() {
        return resultado;
    }

    public void setResultado(String resultado) {
        this.resultado = resultado;
    }

    public String getMensajeError() {
        return mensajeError;
    }

    public void setMensajeError(String mensajeError) {
        this.mensajeError = mensajeError;
    }
}
