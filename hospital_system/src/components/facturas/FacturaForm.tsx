import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import facturaService from '../../services/facturaService';
import '../../css/Forms.css';
import '../../css/Components.css';

const FacturaForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const [factura, setFactura] = useState({
        idPaciente: '',
        fechaEmision: '',
        total: 0,
        estado: 'pendiente'
    });

    useEffect(() => {
        if (id) {
            cargarFactura(id);
        }
    }, [id]);

    const cargarFactura = async (idFactura) => {
        try {
            const response = await facturaService.getById(idFactura);
            if (response.data) {
                setFactura(response.data);
            }
        } catch (error) {
            setMessage('Error al cargar factura');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFactura({ ...factura, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await facturaService.update(id, factura);
                setMessage('Factura actualizada correctamente');
            } else {
                await facturaService.create(factura);
                setMessage('Factura creada correctamente');
            }
            setTimeout(() => {
                navigate('/facturas');
            }, 1500);
        } catch (error) {
            setMessage('Error al guardar factura');
        }
    };

    return (
        <div className="form-container">
            <h2>{id ? 'Editar Factura' : 'Nueva Factura'}</h2>
            {message && (
                <div className={`alert ${message.includes('Error') ? 'alert-error' : 'alert-success'}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>ID Paciente *</label>
                        <input
                            type="number"
                            name="idPaciente"
                            value={factura.idPaciente}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Fecha Emisión *</label>
                        <input
                            type="date"
                            name="fechaEmision"
                            value={factura.fechaEmision}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Total (S/.) *</label>
                    <input
                        type="number"
                        name="total"
                        value={factura.total}
                        onChange={handleChange}
                        required
                        step="0.01"
                        className="form-control"
                        min="0"
                    />
                </div>
                <div className="form-group">
                    <label>Estado *</label>
                    <select
                        name="estado"
                        value={factura.estado}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="pendiente">Pendiente</option>
                        <option value="pagado">Pagado</option>
                    </select>
                </div>
                <div className="form-buttons">
                    <button type="submit" className="btn btn-success">
                        Guardar
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => navigate('/facturas')}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FacturaForm;
