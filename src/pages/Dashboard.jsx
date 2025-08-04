// File: src/pages/Dashboard.jsx
import React from 'react';
import './Dashboard.css';

function Dashboard() {
  const medications = [
    { name: 'Panado', category: 'Painkiller', quantity: 100 },
    { name: 'ARV', category: 'HIV', quantity: 60 },
    { name: 'Isoniazid', category: 'TB', quantity: 40 },
    { name: 'Tamiflu', category: 'Flu', quantity: 50 },
    { name: 'Chemoxal', category: 'Cancer', quantity: 30 }
  ];

  return (
    <div className="dashboard-page">
      <h2>Medication Dashboard</h2>
      <div className="dashboard-grid">
        {medications.map((med, index) => (
          <div key={index} className="med-card">
            <h3>{med.name}</h3>
            <p><strong>Category:</strong> {med.category}</p>
            <p><strong>Quantity:</strong> {med.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

