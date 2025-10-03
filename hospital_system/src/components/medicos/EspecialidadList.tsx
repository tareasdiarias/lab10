import React, { useState, useEffect } from 'react';
import medicoService from '../../services/medicoService';
import '../../css/Tables.css';
import '../../css/Components.css';

const EspecialidadList = () => {
    const [especialidades, setEspecialidades] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarEspecialidades();
    }, []);

    const cargarEspecialidades = async () => {
        try {
            const response = await medicoService.getAllEspecialidades();
            setEspecialidades(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Cargando especialidades...</div>;
    }

    return (
        <div className="table-container">
            <div className="page-header">
                <h2>Especialidades Médicas</h2>
            </div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                </tr>
                </thead>
                <tbody>
                {especialidades.length === 0 && (
                    <tr>
                        <td colSpan="3" className="no-data">No hay especialidades registradas.</td>
                    </tr>
                )}
                {especialidades.map((esp) => (
                    <tr key={esp.idEspecialidad}>
                        <td>{esp.idEspecialidad}</td>
                        <td>{esp.nombre}</td>
                        <td>{esp.descripcion}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EspecialidadList;
