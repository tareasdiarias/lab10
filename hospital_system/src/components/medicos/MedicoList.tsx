import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import medicoService from '../../services/medicoService';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import '../../css/Tables.css';
import '../../css/Components.css';

const MedicoList = () => {
    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        cargarMedicos();
    }, []);

    const cargarMedicos = async () => {
        try {
            const response = await medicoService.getAllMedicos();
            setMedicos(response.data);
            setLoading(false);
        } catch (error) {
            setMessage('Error al cargar médicos');
            setLoading(false);
        }
    };

    const eliminarMedico = async (id) => {
        if (window.confirm('¿Seguro que desea eliminar este médico?')) {
            try {
                await medicoService.deleteMedico(id);
                setMessage('Médico eliminado correctamente');
                cargarMedicos();
            } catch (error) {
                setMessage('Error al eliminar médico');
            }
        }
    };

    if (loading) {
        return <div className="loading">Cargando médicos...</div>;
    }

    return (
        <div className="table-container">
            <div className="page-header">
                <h2>Gestión de Médicos</h2>
                <Link to="/medicos/nuevo" className="btn btn-primary">
                    <FaPlus /> Nuevo Médico
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
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Colegiatura</th>
                    <th>Teléfono</th>
                    <th>Correo</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {medicos.length === 0 && (
                    <tr>
                        <td colSpan="8" className="no-data">Sin médicos registrados.</td>
                    </tr>
                )}
                {medicos.map((medico) => (
                    <tr key={medico.idMedico}>
                        <td>{medico.idMedico}</td>
                        <td>{medico.nombres}</td>
                        <td>{medico.apellidos}</td>
                        <td>{medico.colegiatura}</td>
                        <td>{medico.telefono}</td>
                        <td>{medico.correo}</td>
                        <td>
                            <span className={`estado-${medico.estado}`}>{medico.estado}</span>
                        </td>
                        <td>
                            <div className="action-buttons">
                                <Link to={`/medicos/editar/${medico.idMedico}`} className="btn btn-warning">
                                    <FaEdit />
                                </Link>
                                <button onClick={() => eliminarMedico(medico.idMedico)} className="btn btn-danger">
                                    Eliminar
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MedicoList;
