// File: src/pages/Logs.jsx
import React from 'react';
import './Logs.css';

const mockLogs = [
  { action: 'Issued', medication: 'Panado', quantity: 10, user: 'Nurse Deli', date: '2025-08-01' },
  { action: 'Restocked', medication: 'ARV', quantity: 30, user: 'Pharmacist Lungi', date: '2025-08-01' },
  { action: 'Issued', medication: 'Isoniazid', quantity: 5, user: 'Nurse Deli', date: '2025-07-31' },
  { action: 'Restocked', medication: 'Tamiflu', quantity: 25, user: 'Pharmacist Lungi', date: '2025-07-30' }
];

function Logs() {
  return (
    <div className="logs-container">
      <h2>Medication Logs</h2>
      <table className="logs-table">
        <thead>
          <tr>
            <th>Action</th>
            <th>Medication</th>
            <th>Quantity</th>
            <th>User</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {mockLogs.map((log, index) => (
            <tr key={index}>
              <td className={log.action === 'Issued' ? 'issued' : 'restocked'}>{log.action}</td>
              <td>{log.medication}</td>
              <td>{log.quantity}</td>
              <td>{log.user}</td>
              <td>{log.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Logs;
