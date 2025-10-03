import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import consultaService from '../../services/consultaService';
import '../../css/Forms.css';
import '../../css/Components.css';

const ConsultaForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const [consulta, setConsulta] = useState({
        idCita: '',
        idMedico: '',
        idPaciente: '',
        fecha: '',
        hora: '',
        motivoConsulta: '',
        observaciones: '',
    });

    useEffect(() => {
        if (id) {
            cargarConsulta(id);
        }
    }, [id]);

    const cargarConsulta = async (consultaId) => {
        try {
            const response = await consultaService.getById(consultaId);
            if (response.data) {
                setConsulta(response.data);
            }
        } catch (error) {
            setMessage('Error al cargar consulta');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConsulta({ ...consulta, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await consultaService.update(id, consulta);
                setMessage('Consulta actualizada correctamente');
            } else {
                await consultaService.create(consulta);
                setMessage('Consulta creada correctamente');
            }
            setTimeout(() => {
                navigate('/consultas');
            }, 1500);
        } catch (error) {
            setMessage('Error al guardar consulta');
        }
    };

    return (
        <div className="form-container">
            <h2>{id ? 'Editar Consulta' : 'Nueva Consulta'}</h2>
            {message && (
                <div className={`alert ${message.includes('Error') ? 'alert-error' : 'alert-success'}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>ID Cita *</label>
                        <input
                            type="number"
                            name="idCita"
                            value={consulta.idCita}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>ID Médico *</label>
                        <input
                            type="number"
                            name="idMedico"
                            value={consulta.idMedico}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>ID Paciente *</label>
                        <input
                            type="number"
                            name="idPaciente"
                            value={consulta.idPaciente}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Fecha *</label>
                        <input
                            type="date"
                            name="fecha"
                            value={consulta.fecha}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Hora *</label>
                        <input
                            type="time"
                            name="hora"
                            value={consulta.hora}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Motivo Consulta *</label>
                    <textarea
                        name="motivoConsulta"
                        value={consulta.motivoConsulta}
                        onChange={handleChange}
                        required
                        className="form-control"
                        rows="3"
                    />
                </div>
                <div className="form-group">
                    <label>Observaciones</label>
                    <textarea
                        name="observaciones"
                        value={consulta.observaciones}
                        onChange={handleChange}
                        className="form-control"
                        rows="3"
                    />
                </div>
                <div className="form-buttons">
                    <button type="submit" className="btn btn-success">
                        Guardar
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => navigate('/consultas')}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ConsultaForm;
