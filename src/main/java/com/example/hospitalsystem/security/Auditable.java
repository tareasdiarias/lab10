package com.example.hospitalsystem.security;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Auditable {
    String accion(); // CREATE, UPDATE, DELETE, READ
    String entidad(); // Paciente, Medico, Consulta, etc.
}
