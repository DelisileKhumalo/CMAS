import React from 'react';
import './Alerts.css';

function Alerts() {
  const alerts = [
    { name: 'ARV', quantity: 12, threshold: 20 },
    { name: 'Chemoxal', quantity: 8, threshold: 10 },
    { name: 'Isoniazid', quantity: 15, threshold: 18 }
  ];

  return (
    <div className="alerts-page">
      <h2>Low Stock Alerts</h2>
      <ul className="alert-list">
        {alerts.map((alert, index) => (
          <li key={index} className="alert-item">
            ⚠️ <strong>{alert.name}</strong> is below threshold! (Current: {alert.quantity}, Threshold: {alert.threshold})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Alerts;

