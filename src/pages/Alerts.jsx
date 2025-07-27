
import React, { useState } from 'react';

function Alerts() {
  const allAlerts = [
    { medication: 'HIV Medication', quantity: 2, category: 'HIV' },
    { medication: 'Flu Tablets', quantity: 5, category: 'Flu' },
    { medication: 'TB Medication', quantity: 3, category: 'TB' }
  ];

  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? allAlerts : allAlerts.filter(a => a.category === filter);

  return (
    <div>
      <h2>⚠️ Low Stock Alerts</h2>
      <select onChange={e => setFilter(e.target.value)} value={filter}>
        <option>All</option>
        <option>HIV</option>
        <option>Flu</option>
        <option>TB</option>
      </select>
      <ul style={{ marginTop: '1rem' }}>
        {filtered.map((alert, i) => (
          <li key={i}>
            <strong>{alert.medication}</strong> — only <span style={{ color: 'red' }}>{alert.quantity}</span> left!
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Alerts;
