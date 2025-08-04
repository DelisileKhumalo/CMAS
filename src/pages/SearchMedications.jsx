// File: src/pages/SearchMedications.jsx
import React, { useState } from 'react';
import './SearchMedications.css';

function SearchMedications() {
  const medications = [
    { name: 'Panado', category: 'Painkiller', quantity: 100 },
    { name: 'ARV', category: 'HIV', quantity: 60 },
    { name: 'Isoniazid', category: 'TB', quantity: 40 },
    { name: 'Tamiflu', category: 'Flu', quantity: 50 },
    { name: 'Chemoxal', category: 'Cancer', quantity: 30 }
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredMeds = medications.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-page">
      <h2>Search Medications</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="medication-results">
        {filteredMeds.map((med, index) => (
          <div key={index} className="med-card">
            <h4>{med.name}</h4>
            <p>Category: {med.category}</p>
            <p>Quantity: {med.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchMedications;
