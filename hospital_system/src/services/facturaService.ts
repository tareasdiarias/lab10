import api from './api.js';

const FACTURA_API = '/facturas';

const facturaService = {
    getAll: () => {
        return api.get(FACTURA_API);
    },

    getById: (id) => {
        return api.get(`${FACTURA_API}/${id}`);
    },

    getByPaciente: (idPaciente) => {
        return api.get(`${FACTURA_API}/paciente/${idPaciente}`);
    },

    create: (factura) => {
        return api.post(FACTURA_API, factura);
    },

    update: (id, factura) => {
        return api.put(`${FACTURA_API}/${id}`, factura);
    },

    cambiarEstado: (id, estado) => {
        return api.patch(`${FACTURA_API}/${id}/estado`, { estado });
    },

    delete: (id) => {
        return api.delete(`${FACTURA_API}/${id}`);
    },

    // Detalles
    getDetalles: (idFactura) => {
        return api.get(`${FACTURA_API}/${idFactura}/detalles`);
    },

    addDetalle: (idFactura, detalle) => {
        return api.post(`${FACTURA_API}/${idFactura}/detalles`, detalle);
    },
};

export default facturaService;
