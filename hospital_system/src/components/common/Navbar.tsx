import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHospital, FaUserInjured, FaCalendarAlt, FaUserMd, FaStethoscope, FaFileInvoice } from 'react-icons/fa';
import '../../css/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <NavLink to="/" className="navbar-brand">
                    <FaHospital className="brand-icon" />
                    <h1>Hospital System</h1>
                </NavLink>
                <ul className="navbar-menu">
                    <li>
                        <NavLink to="/pacientes" activeclassname="active">
                            <FaUserInjured />
                            Pacientes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/citas" activeclassname="active">
                            <FaCalendarAlt />
                            Citas
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/medicos" activeclassname="active">
                            <FaUserMd />
                            Médicos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/consultas" activeclassname="active">
                            <FaStethoscope />
                            Consultas
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/facturas" activeclassname="active">
                            <FaFileInvoice />
                            Facturación
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
