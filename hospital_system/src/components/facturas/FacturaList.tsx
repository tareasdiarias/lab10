import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import facturaService from '../../services/facturaService';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import '../../css/Tables.css';
import '../../css/Components.css';

const FacturaList = () => {
    const [facturas, setFacturas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        cargarFacturas();
    }, []);

    const cargarFacturas = async () => {
        try {
            const response = await facturaService.getAll();
            setFacturas(response.data);
            setLoading(false);
        } catch (error) {
            setMessage('Error al cargar facturas');
            setLoading(false);
        }
    };

    const eliminarFactura = async (id) => {
        if (window.confirm('¿Seguro que desea eliminar esta factura?')) {
            try {
                await facturaService.delete(id);
                setMessage('Factura eliminada correctamente');
                cargarFacturas();
            } catch (error) {
                setMessage('Error al eliminar factura');
            }
        }
    };

    if (loading) {
        return <div className="loading">Cargando facturas...</div>;
    }

    return (
        <div className="table-container">
            <div className="page-header">
                <h2>Gestión de Facturas</h2>
                <Link to="/facturas/nueva" className="btn btn-primary">
                    <FaPlus /> Nueva Factura
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
                    <th>ID Paciente</th>
                    <th>Fecha Emisión</th>
                    <th>Total S/</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {facturas.length === 0 && (
                    <tr>
                        <td colSpan="6" className="no-data">Sin facturas registradas.</td>
                    </tr>
                )}
                {facturas.map((factura) => (
                    <tr key={factura.idFactura}>
                        <td>{factura.idFactura}</td>
                        <td>{factura.idPaciente}</td>
                        <td>{factura.fechaEmision}</td>
                        <td>{factura.total.toFixed(2)}</td>
                        <td>
                            <span className={`estado-${factura.estado}`}>{factura.estado}</span>
                        </td>
                        <td>
                            <div className="action-buttons">
                                <Link to={`/facturas/editar/${factura.idFactura}`} className="btn btn-warning">
                                    <FaEdit />
                                </Link>
                                <button onClick={() => eliminarFactura(factura.idFactura)} className="btn btn-danger">
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

export default FacturaList;
