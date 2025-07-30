
// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid, ResponsiveContainer } from 'recharts';
import SmartAlerts from '../components/SmartAlerts';

const Dashboard = () => {
  const [medications, setMedications] = useState([]);
  const [usageData, setUsageData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const medsRes = await fetch('/api/medications'); // current stocks
        const usageRes = await fetch('/api/logs/summary'); // daily or weekly usage

        const medsData = await medsRes.json();
        const usageSummary = await usageRes.json();

        setMedications(medsData);
        setUsageData(usageSummary);
        setLoading(false);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-6">Loading dashboard...</div>;

  const totalMeds = medications.length;
  const lowStock = medications.filter(m => m.stock < 10).length;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">📊 Dashboard</h1>

      {/* 🔢 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 rounded p-4 shadow">
          <h2 className="text-lg font-semibold">Total Medications</h2>
          <p className="text-2xl">{totalMeds}</p>
        </div>
        <div className="bg-yellow-100 rounded p-4 shadow">
          <h2 className="text-lg font-semibold">Low Stock Meds</h2>
          <p className="text-2xl text-yellow-800">{lowStock}</p>
        </div>
        <div className="bg-green-100 rounded p-4 shadow">
          <h2 className="text-lg font-semibold">Last Updated</h2>
          <p className="text-sm">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* 📊 Current Stock Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-2">📦 Current Medication Stock</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={medications} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stock" fill="#3182ce" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📈 Usage Over Time */}
      <div>
        <h2 className="text-xl font-semibold mb-2">📈 Medication Usage Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={usageData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="totalUsed" stroke="#e53e3e" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ⚠️ Smart Alerts */}
      <SmartAlerts />
    </div>
  );
};

export default Dashboard;

