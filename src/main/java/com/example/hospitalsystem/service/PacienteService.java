package com.example.hospitalsystem.service;

import com.example.hospitalsystem.model.AntecedenteMedico;
import com.example.hospitalsystem.model.HistoriaClinica;
import com.example.hospitalsystem.model.Paciente;
import com.example.hospitalsystem.repository.AntecedenteMedicoRepository;
import com.example.hospitalsystem.repository.HistoriaClinicaRepository;
import com.example.hospitalsystem.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private HistoriaClinicaRepository historiaClinicaRepository;

    @Autowired
    private AntecedenteMedicoRepository antecedenteMedicoRepository;

    public List<Paciente> getAllPacientes() {
        return pacienteRepository.findAll();
    }

    public Optional<Paciente> getPacienteById(Long id) {
        return pacienteRepository.findById(id);
    }

    public Optional<Paciente> getPacienteByDni(String dni) {
        return pacienteRepository.findByDni(dni);
    }

    @Transactional
    public Paciente createPaciente(Paciente paciente) {
        Paciente savedPaciente = pacienteRepository.save(paciente);

        // Crear automáticamente la historia clínica
        HistoriaClinica historia = new HistoriaClinica();
        historia.setIdPaciente(savedPaciente.getIdPaciente());
        historia.setFechaApertura(LocalDate.now());
        historia.setObservaciones("Historia clínica creada automáticamente");
        historiaClinicaRepository.save(historia);

        return savedPaciente;
    }

    public Paciente updatePaciente(Long id, Paciente paciente) {
        if (pacienteRepository.existsById(id)) {
            paciente.setIdPaciente(id);
            return pacienteRepository.save(paciente);
        }
        return null;
    }

    public boolean deletePaciente(Long id) {
        if (pacienteRepository.existsById(id)) {
            pacienteRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<HistoriaClinica> getHistoriaClinicaByPaciente(Long idPaciente) {
        return historiaClinicaRepository.findByIdPaciente(idPaciente);
    }

    public List<AntecedenteMedico> getAntecedentesByHistoria(Long idHistoria) {
        return antecedenteMedicoRepository.findByIdHistoria(idHistoria);
    }

    public AntecedenteMedico addAntecedenteMedico(AntecedenteMedico antecedente) {
        return antecedenteMedicoRepository.save(antecedente);
    }
}
