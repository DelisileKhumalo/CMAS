// File: src/pages/MedicationUseForm.jsx
import React, { useState, useEffect } from 'react';
import './FormStyles.css';

function MedicationUseForm() {
  const [medications, setMedications] = useState([]);
  const [form, setForm] = useState({ medication: '', quantity: '', nurse: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/medications')
      .then(res => res.json())
      .then(data => setMedications(data))
      .catch(err => console.error('Failed to load medications', err));
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/use-medication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Medication use logged successfully');
        setForm({ medication: '', quantity: '', nurse: '' });
      } else {
        setMessage(data.error || 'Failed to log medication use');
      }
    } catch (err) {
      setMessage('Server error');
    }
  };

  return (
    <div className="form-container">
      <h2>Log Medication Use</h2>
      <form onSubmit={handleSubmit} className="styled-form">
        <select name="medication" value={form.medication} onChange={handleChange} required>
          <option value="">Select Medication</option>
          {medications.map((med) => (
            <option key={med._id} value={med.name}>{med.name}</option>
          ))}
        </select>
        <input type="number" name="quantity" placeholder="Quantity Used" value={form.quantity} onChange={handleChange} required />
        <input type="text" name="nurse" placeholder="Nurse Name" value={form.nurse} onChange={handleChange} required />
        <button type="submit">Submit</button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
}

export default MedicationUseForm;

