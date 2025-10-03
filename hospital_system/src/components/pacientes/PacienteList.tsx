import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import pacienteService from '../../services/pacienteService';
import { FaEdit, FaTrash, FaPlus, FaHistory } from 'react-icons/fa';
import '../../css/Tables.css';
import '../../css/Components.css';

const PacienteList = () => {
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        cargarPacientes();
    }, []);

    const cargarPacientes = async () => {
        try {
            const response = await pacienteService.getAll();
            setPacientes(response.data);
            setLoading(false);
        } catch (error) {
            setMessage('Error al cargar pacientes');
            setLoading(false);
        }
    };

    const eliminarPaciente = async (id) => {
        if (window.confirm('¿Seguro que desea eliminar este paciente?')) {
            try {
                await pacienteService.delete(id);
                setMessage('Paciente eliminado correctamente');
                cargarPacientes();
            } catch (error) {
                setMessage('Error al eliminar paciente');
            }
        }
    };

    if (loading) {
        return <div className="loading">Cargando pacientes...</div>;
    }

    return (
        <div className="table-container">
            <div className="page-header">
                <h2>Gestión de Pacientes</h2>
                <Link to="/pacientes/nuevo" className="btn btn-primary">
                    <FaPlus /> Nuevo Paciente
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
                    <th>DNI</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Fecha Nacimiento</th>
                    <th>Sexo</th>
                    <th>Teléfono</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {pacientes.length === 0 && (
                    <tr>
                        <td colSpan="9" className="no-data">Sin pacientes registrados.</td>
                    </tr>
                )}
                {pacientes.map((paciente) => (
                    <tr key={paciente.idPaciente}>
                        <td>{paciente.idPaciente}</td>
                        <td>{paciente.dni}</td>
                        <td>{paciente.nombres}</td>
                        <td>{paciente.apellidos}</td>
                        <td>{paciente.fechaNacimiento}</td>
                        <td>{paciente.sexo}</td>
                        <td>{paciente.telefono}</td>
                        <td>
                            <span className={`estado-${paciente.estado}`}>{paciente.estado}</span>
                        </td>
                        <td>
                            <div className="action-buttons">
                                <Link to={`/pacientes/historia/${paciente.idPaciente}`} className="btn btn-info">
                                    <FaHistory />
                                </Link>
                                <Link to={`/pacientes/editar/${paciente.idPaciente}`} className="btn btn-warning">
                                    <FaEdit />
                                </Link>
                                <button onClick={() => eliminarPaciente(paciente.idPaciente)} className="btn btn-danger">
                                    <FaTrash />
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

export default PacienteList;
