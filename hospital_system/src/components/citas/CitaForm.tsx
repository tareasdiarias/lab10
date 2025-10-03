import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import citaService from "../../services/citaService";

const CitaForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [cita, setCita] = useState({
        idPaciente: "",
        idMedico: "",
        fecha: "",
        hora: "",
        motivo: "",
        estado: "programada",
    });

    useEffect(() => {
        // Si hay id, cargar datos (modo edición)
        if (id) {
            citaService.getById(id).then((response) => {
                setCita(response.data);
            });
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCita((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (id) {
                await citaService.update(id, cita);
                setMessage("Cita actualizada correctamente");
            } else {
                await citaService.create(cita);
                setMessage("Cita creada correctamente");
            }
            setTimeout(() => {
                navigate("/citas");
            }, 1500);
        } catch (error) {
            setMessage("Error al guardar la cita");
        }
    };

    return (
        <div className="form-container">
            <h2>{id ? "Editar Cita" : "Nueva Cita"}</h2>
            {message && (
                <div
                    className={`alert ${
                        message.includes("Error") ? "alert-error" : "alert-success"
                    }`}
                >
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
                            value={cita.idPaciente}
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
                            value={cita.idMedico}
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
                            value={cita.fecha}
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
                            value={cita.hora}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Motivo *</label>
                    <textarea
                        name="motivo"
                        value={cita.motivo}
                        onChange={handleChange}
                        required
                        className="form-control"
                        rows={3}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Estado *</label>
                    <select
                        name="estado"
                        value={cita.estado}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="programada">Programada</option>
                        <option value="atendida">Atendida</option>
                        <option value="cancelada">Cancelada</option>
                    </select>
                </div>
                <div className="form-buttons">
                    <button type="submit" className="btn btn-success">
                        Guardar
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => navigate("/citas")}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CitaForm;
