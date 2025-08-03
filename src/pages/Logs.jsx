// File: src/pages/Logs.jsx
import React, { useEffect, useState } from 'react';
import './Logs.css';

function Logs() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/logs')
      .then(res => res.json())
      .then(data => setLogs(data))
      .catch(err => {
        console.error('Error fetching logs:', err);
        setError('Failed to fetch logs');
      });
  }, []);

  return (
    <div className="logs-container">
      <h2>Activity Logs</h2>
      {error && <p className="error">{error}</p>}
      <ul className="logs-list">
        {logs.map((log, index) => (
          <li key={index} className="log-entry">
            <strong>{log.nurse}</strong> <em>{log.action}</em> for <strong>{log.medication}</strong> on <span>{new Date(log.timestamp).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Logs;
