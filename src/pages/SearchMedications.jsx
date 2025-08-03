// File: src/pages/SearchMedications.jsx
import React, { useState, useEffect } from 'react';
import './SearchMedications.css';

function SearchMedications() {
  const [query, setQuery] = useState('');
  const [medications, setMedications] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/medications')
      .then(res => res.json())
      .then(data => {
        setMedications(data);
        setFiltered(data);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    const results = medications.filter(med =>
      med.name.toLowerCase().includes(value) ||
      med.category.toLowerCase().includes(value)
    );
    setFiltered(results);
  };

  return (
    <div className="search-container">
      <h2>Search Medications</h2>
      <input
        type="text"
        placeholder="Search by name or category..."
        value={query}
        onChange={handleSearch}
        className="search-input"
      />
      <ul className="medication-list">
        {filtered.map((med) => (
          <li key={med._id} className="medication-item">
            <strong>{med.name}</strong> — {med.category} (Qty: {med.quantity})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchMedications;
