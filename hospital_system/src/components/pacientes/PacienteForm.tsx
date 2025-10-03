import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import pacienteService from '../../services/pacienteService';
import '../../css/Forms.css';
import '../../css/Components.css';

const PacienteForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const [paciente, setPaciente] = useState({
        dni: '',
        nombres: '',
        apellidos: '',
        fechaNacimiento: '',
        sexo: 'M',
        direccion: '',
        telefono: '',
        correo: '',
        estado: 'activo',
    });

    useEffect(() => {
        if (id) {
            cargarPaciente(id);
        }
    }, [id]);

    const cargarPaciente = async (pacienteId) => {
        try {
            const response = await pacienteService.getById(pacienteId);
            if (response.data) {
                setPaciente(response.data);
            }
        } catch (error) {
            setMessage('Error al cargar paciente');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaciente({ ...paciente, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await pacienteService.update(id, paciente);
                setMessage('Paciente actualizado correctamente');
            } else {
                await pacienteService.create(paciente);
                setMessage('Paciente creado correctamente');
            }
            setTimeout(() => {
                navigate('/pacientes');
            }, 1500);
        } catch (error) {
            setMessage('Error al guardar paciente');
        }
    };

    return (
        <div className="form-container">
            <h2>{id ? 'Editar Paciente' : 'Nuevo Paciente'}</h2>
            {message && (
                <div className={`alert ${message.includes('Error') ? 'alert-error' : 'alert-success'}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>DNI <span>*</span></label>
                        <input
                            type="text"
                            name="dni"
                            value={paciente.dni}
                            onChange={handleChange}
                            maxLength="8"
                            required
                            className="form-control"
                            disabled={!!id} // Disabled editing DNI when editing
                        />
                    </div>
                    <div className="form-group">
                        <label>Nombres <span>*</span></label>
                        <input
                            type="text"
                            name="nombres"
                            value={paciente.nombres}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Apellidos <span>*</span></label>
                        <input
                            type="text"
                            name="apellidos"
                            value={paciente.apellidos}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Fecha de Nacimiento <span>*</span></label>
                        <input
                            type="date"
                            name="fechaNacimiento"
                            value={paciente.fechaNacimiento}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Sexo <span>*</span></label>
                        <select
                            name="sexo"
                            value={paciente.sexo}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Dirección</label>
                        <input
                            type="text"
                            name="direccion"
                            value={paciente.direccion}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Teléfono</label>
                        <input
                            type="text"
                            name="telefono"
                            value={paciente.telefono}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Correo</label>
                        <input
                            type="email"
                            name="correo"
                            value={paciente.correo}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Estado</label>
                        <select
                            name="estado"
                            value={paciente.estado}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                    </div>
                </div>

                <div className="form-buttons">
                    <button type="submit" className="btn btn-success">
                        Guardar
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => navigate('/pacientes')}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PacienteForm;
