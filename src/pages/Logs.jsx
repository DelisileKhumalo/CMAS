
import React, { useState } from 'react';

function Logs() {
  const allLogs = [
    { time: '09:15 AM', action: 'Nurse Thuli requested 5 TB meds' },
    { time: '10:00 AM', action: 'Supplier delivered 20 Flu Tablets' },
    { time: '01:20 PM', action: 'Low stock alert triggered for HIV meds' },
  ];

  const [search, setSearch] = useState('');

  const filteredLogs = allLogs.filter(log =>
    log.action.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>📝 System Logs</h2>
      <input
        type="text"
        placeholder="Search logs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '0.5rem',
          width: '100%',
          marginBottom: '1rem',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      />
      <ul>
        {filteredLogs.map((log, index) => (
          <li key={index}>
            <strong>{log.time}</strong>: {log.action}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Logs;
