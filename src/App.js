// File: src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Alerts from './pages/Alerts';
import Dashboard from './pages/Dashboard';
import Logs from './pages/Logs';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MedicationUseForm from './pages/MedicationUseForm';
import RestockForm from './pages/RestockForm';
import './App.css';
import SearchMedications from './pages/SearchMedications';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <h1 className="logo">Clinic MedSys</h1>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
            <li><NavLink to="/alerts" className={({ isActive }) => isActive ? 'active' : ''}>Alerts</NavLink></li>
            <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink></li>
            <li><NavLink to="/logs" className={({ isActive }) => isActive ? 'active' : ''}>Logs</NavLink></li>
            <li><NavLink to="/use-medication" className={({ isActive }) => isActive ? 'active' : ''}>Use Medication</NavLink></li>
            <li><NavLink to="/restock" className={({ isActive }) => isActive ? 'active' : ''}>Restock</NavLink></li>
            <li><NavLink to="/search">Search</NavLink></li>
          </ul>
        </nav>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/use-medication" element={<MedicationUseForm />} />
            <Route path="/restock" element={<RestockForm />} />
            <Route path="/search" element={<SearchMedications />} />
          </Routes>
        </div>
        <div className="auth-buttons">
          <button className="auth-btn" onClick={() => window.location.href='/signin'}>Sign In</button>
          <button className="auth-btn" onClick={() => window.location.href='/signup'}>Sign Up</button>
        </div>
      </div>
    </Router>
  );
}

export default App;

