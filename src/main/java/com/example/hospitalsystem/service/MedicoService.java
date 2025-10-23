package com.example.hospitalsystem.service;

import com.example.hospitalsystem.model.Especialidad;
import com.example.hospitalsystem.model.Medico;
import com.example.hospitalsystem.repository.EspecialidadRepository;
import com.example.hospitalsystem.repository.MedicoRepository;
import com.example.hospitalsystem.security.Auditable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicoService {

    @Autowired
    private MedicoRepository medicoRepository;

    @Autowired
    private EspecialidadRepository especialidadRepository;

    public List<Medico> getAllMedicos() {
        return medicoRepository.findAll();
    }

    public Optional<Medico> getMedicoById(Long id) {
        return medicoRepository.findById(id);
    }

    @Auditable(accion = "CREATE", entidad = "Medico")
    public Medico createMedico(Medico medico) {
        return medicoRepository.save(medico);
    }

    @Auditable(accion = "UPDATE", entidad = "Medico")
    public Medico updateMedico(Long id, Medico medico) {
        if (medicoRepository.existsById(id)) {
            medico.setIdMedico(id);
            return medicoRepository.save(medico);
        }
        return null;
    }

    @Auditable(accion = "DELETE", entidad = "Medico")
    public boolean deleteMedico(Long id) {
        if (medicoRepository.existsById(id)) {
            medicoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Especialidad> getAllEspecialidades() {
        return especialidadRepository.findAll();
    }

    public Optional<Especialidad> getEspecialidadById(Long id) {
        return especialidadRepository.findById(id);
    }

    @Auditable(accion = "CREATE", entidad = "Especialidad")
    public Especialidad createEspecialidad(Especialidad especialidad) {
        return especialidadRepository.save(especialidad);
    }

    @Auditable(accion = "UPDATE", entidad = "Especialidad")
    public Especialidad updateEspecialidad(Long id, Especialidad especialidad) {
        if (especialidadRepository.existsById(id)) {
            especialidad.setIdEspecialidad(id);
            return especialidadRepository.save(especialidad);
        }
        return null;
    }

    @Auditable(accion = "DELETE", entidad = "Especialidad")
    public boolean deleteEspecialidad(Long id) {
        if (especialidadRepository.existsById(id)) {
            especialidadRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
