// src/components/SmartAlerts.jsx
import React, { useEffect, useState } from 'react';

const SmartAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/alerts/predicted')
      .then(res => res.json())
      .then(data => {
        setAlerts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch alerts:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading alerts...</div>;

  if (alerts.length === 0) return <div>No predicted alerts 🎉</div>;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold mb-2">⚠️ Smart Medication Alerts</h2>
      {alerts.map((alert, idx) => (
        <div key={idx} className="border-l-4 border-red-600 bg-red-100 p-4 rounded shadow">
          <p className="font-semibold text-red-700">{alert.medication}</p>
          <p className="text-sm">Current stock: {alert.stock}</p>
          <p className="text-sm">{alert.alert}</p>
        </div>
      ))}
    </div>
  );
};

export default SmartAlerts;
