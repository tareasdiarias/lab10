import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import citaService from '../../services/citaService';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import '../../css/Tables.css';
import '../../css/Components.css';

const CitaList = () => {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        cargarCitas();
    }, []);

    const cargarCitas = async () => {
        try {
            const response = await citaService.getAll();
            setCitas(response.data);
            setLoading(false);
        } catch (error) {
            setMessage('Error al cargar citas');
            setLoading(false);
        }
    };

    const eliminarCita = async (id) => {
        if (window.confirm('¿Seguro que desea eliminar esta cita?')) {
            try {
                await citaService.delete(id);
                setMessage('Cita eliminada correctamente');
                cargarCitas();
            } catch (error) {
                setMessage('Error al eliminar cita');
            }
        }
    };

    if (loading) {
        return <div className="loading">Cargando citas...</div>;
    }

    return (
        <div className="table-container">
            <div className="page-header">
                <h2>Gestión de Citas</h2>
                <Link to="/citas/nueva" className="btn btn-primary">
                    <FaPlus /> Nueva Cita
                </Link>
            </div>

            {message && (
                <div className={`alert ${message.includes('Error') ? 'alert-error' : 'alert-success'}`}>
                    {message}
                </div>
            )}

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Paciente ID</th>
                    <th>Médico ID</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Motivo</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {citas.length === 0 && (
                    <tr>
                        <td colSpan="8" className="no-data">Sin citas registradas.</td>
                    </tr>
                )}
                {citas.map((cita) => (
                    <tr key={cita.idCita}>
                        <td>{cita.idCita}</td>
                        <td>{cita.idPaciente}</td>
                        <td>{cita.idMedico}</td>
                        <td>{cita.fecha}</td>
                        <td>{cita.hora}</td>
                        <td>{cita.motivo}</td>
                        <td>
                            <span className={`estado-${cita.estado}`}>{cita.estado}</span>
                        </td>
                        <td>
                            <div className="action-buttons">
                                <Link to={`/citas/editar/${cita.idCita}`} className="btn btn-warning"> <FaEdit /> </Link>
                                <button onClick={() => eliminarCita(cita.idCita)} className="btn btn-danger">Eliminar</button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CitaList;
