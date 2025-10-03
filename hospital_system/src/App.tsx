import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Importar componentes de Pacientes
import PacienteList from './components/pacientes/PacienteList';
import PacienteForm from './components/pacientes/PacienteForm';
import HistoriaClinica from './components/pacientes/HistoriaClinica';

// Importar componentes de Citas
import CitaList from './components/citas/CitaList';
import CitaForm from './components/citas/CitaForm';

// Importar componentes de Medicos
import MedicoList from './components/medicos/MedicoList';
import MedicoForm from './components/medicos/MedicoForm';
import EspecialidadList from './components/medicos/EspecialidadList';

// Importar componentes de Consultas
import ConsultaList from './components/consultas/ConsultaList';
import ConsultaForm from './components/consultas/ConsultaForm';

// Importar componentes de Facturas
import FacturaList from './components/facturas/FacturaList';
import FacturaForm from './components/facturas/FacturaForm';

import './css/App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="main-container">
                    <Routes>
                        {/* Ruta principal */}
                        <Route path="/" element={<Navigate to="/pacientes" />} />

                        {/* Rutas de Pacientes */}
                        <Route path="/pacientes" element={<PacienteList />} />
                        <Route path="/pacientes/nuevo" element={<PacienteForm />} />
                        <Route path="/pacientes/editar/:id" element={<PacienteForm />} />
                        <Route path="/pacientes/historia/:id" element={<HistoriaClinica />} />

                        {/* Rutas de Citas */}
                        <Route path="/citas" element={<CitaList />} />
                        <Route path="/citas/nueva" element={<CitaForm />} />
                        <Route path="/citas/editar/:id" element={<CitaForm />} />

                        {/* Rutas de Medicos */}
                        <Route path="/medicos" element={<MedicoList />} />
                        <Route path="/medicos/nuevo" element={<MedicoForm />} />
                        <Route path="/medicos/editar/:id" element={<MedicoForm />} />
                        <Route path="/especialidades" element={<EspecialidadList />} />

                        {/* Rutas de Consultas */}
                        <Route path="/consultas" element={<ConsultaList />} />
                        <Route path="/consultas/nueva" element={<ConsultaForm />} />
                        <Route path="/consultas/editar/:id" element={<ConsultaForm />} />

                        {/* Rutas de Facturas */}
                        <Route path="/facturas" element={<FacturaList />} />
                        <Route path="/facturas/nueva" element={<FacturaForm />} />
                        <Route path="/facturas/editar/:id" element={<FacturaForm />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;

