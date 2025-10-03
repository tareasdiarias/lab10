import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import consultaService from '../../services/consultaService';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import '../../css/Tables.css';
import '../../css/Components.css';

const ConsultaList = () => {
    const [consultas, setConsultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        cargarConsultas();
    }, []);

    const cargarConsultas = async () => {
        try {
            const response = await consultaService.getAll();
            setConsultas(response.data);
            setLoading(false);
        } catch (error) {
            setMessage('Error al cargar consultas');
            setLoading(false);
        }
    };

    const eliminarConsulta = async (id) => {
        if (window.confirm('¿Seguro que desea eliminar esta consulta?')) {
            try {
                await consultaService.delete(id);
                setMessage('Consulta eliminada correctamente');
                cargarConsultas();
            } catch (error) {
                setMessage('Error al eliminar consulta');
            }
        }
    };

    if (loading) {
        return <div className="loading">Cargando consultas...</div>;
    }

    return (
        <div className="table-container">
            <div className="page-header">
                <h2>Gestión de Consultas</h2>
                <Link to="/consultas/nueva" className="btn btn-primary">
                    <FaPlus /> Nueva Consulta
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
                    <th>ID Cita</th>
                    <th>ID Médico</th>
                    <th>ID Paciente</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Motivo</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {consultas.length === 0 && (
                    <tr>
                        <td colSpan="8" className="no-data">Sin consultas registradas.</td>
                    </tr>
                )}
                {consultas.map((consulta) => (
                    <tr key={consulta.idConsulta}>
                        <td>{consulta.idConsulta}</td>
                        <td>{consulta.idCita}</td>
                        <td>{consulta.idMedico}</td>
                        <td>{consulta.idPaciente}</td>
                        <td>{consulta.fecha}</td>
                        <td>{consulta.hora}</td>
                        <td>{consulta.motivoConsulta}</td>
                        <td>
                            <div className="action-buttons">
                                <Link to={`/consultas/editar/${consulta.idConsulta}`} className="btn btn-warning">
                                    <FaEdit />
                                </Link>
                                <button onClick={() => eliminarConsulta(consulta.idConsulta)} className="btn btn-danger">
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

export default ConsultaList;
