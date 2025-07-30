
// src/pages/SignIn.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ fix 1
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json(); // ✅ fix 2: define `data`

      if (!res.ok) {
        setError(data.message || 'Login failed');
      } else {
        login(data); // store user in context + localStorage
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input className="w-full p-2 border rounded" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Sign In</button>
      </form>
      <p className="mt-4 text-sm text-center">
        Don’t have an account? <a className="text-blue-600 underline" href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default SignIn;
