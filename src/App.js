
// File: src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Alerts from './pages/Alerts';
import Dashboard from './pages/Dashboard';
import Logs from './pages/Logs';
import './App.css';

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
          </ul>
        </nav>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logs" element={<Logs />} />
          </Routes>
        </div>
        <footer className="auth-links">
          <p>🔐 <a href="#">Sign In</a> or <a href="#">Sign Up</a> to manage your clinic account.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
