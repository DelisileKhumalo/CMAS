
import React from 'react';
import './Dashboard.css';

function Dashboard() {
  const stats = [
    {
      title: 'Most Requested Med',
      value: 'ARVs',
      icon: '💊',
      description: 'Frequently prescribed'
    },
    {
      title: 'Fastest Depleting',
      value: 'Flu Tablets',
      icon: '⏳',
      description: 'Low stock expected'
    },
    {
      title: 'Monthly Usage',
      value: '212 doses',
      icon: '📈',
      description: 'Used this month'
    },
    {
      title: 'Supplier Efficiency',
      value: '98%',
      icon: '🚚',
      description: 'On-time deliveries'
    }
  ];

  return (
    <div className="dashboard">
      <h2>📊 Medication Usage Dashboard</h2>
      <div className="card-grid">
        {stats.map((item, index) => (
          <div className="card" key={index}>
            <div className="card-icon">{item.icon}</div>
            <div className="card-title">{item.title}</div>
            <div className="card-value">{item.value}</div>
            <div className="card-desc">{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
