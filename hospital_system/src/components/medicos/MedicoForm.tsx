import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import medicoService from '../../services/medicoService';
import '../../css/Forms.css';
import '../../css/Components.css';

const MedicoForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const [medico, setMedico] = useState({
        nombres: '',
        apellidos: '',
        colegiatura: '',
        telefono: '',
        correo: '',
        estado: 'activo'
    });

    useEffect(() => {
        if (id) {
            cargarMedico(id);
        }
    }, [id]);

    const cargarMedico = async (idMedico) => {
        try {
            const response = await medicoService.getMedicoById(idMedico);
            if (response.data) {
                setMedico(response.data);
            }
        } catch (error) {
            setMessage('Error al cargar médico');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMedico({ ...medico, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await medicoService.updateMedico(id, medico);
                setMessage('Médico actualizado correctamente');
            } else {
                await medicoService.createMedico(medico);
                setMessage('Médico creado correctamente');
            }
            setTimeout(() => {
                navigate('/medicos');
            }, 1500);
        } catch (error) {
            setMessage('Error al guardar médico');
        }
    };

    return (
        <div className="form-container">
            <h2>{id ? 'Editar Médico' : 'Nuevo Médico'}</h2>
            {message && (
                <div className={`alert ${message.includes('Error') ? 'alert-error' : 'alert-success'}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>Nombres *</label>
                        <input
                            type="text"
                            name="nombres"
                            value={medico.nombres}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Apellidos *</label>
                        <input
                            type="text"
                            name="apellidos"
                            value={medico.apellidos}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Colegiatura *</label>
                        <input
                            type="text"
                            name="colegiatura"
                            value={medico.colegiatura}
                            onChange={handleChange}
                            required
                            className="form-control"
                            disabled={!!id} // disable editing colegiatura when editing
                        />
                    </div>
                    <div className="form-group">
                        <label>Teléfono</label>
                        <input
                            type="text"
                            name="telefono"
                            value={medico.telefono}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Correo</label>
                        <input
                            type="email"
                            name="correo"
                            value={medico.correo}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Estado</label>
                    <select
                        name="estado"
                        value={medico.estado}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>
                </div>

                <div className="form-buttons">
                    <button type="submit" className="btn btn-success">
                        Guardar
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => navigate('/medicos')}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MedicoForm;
