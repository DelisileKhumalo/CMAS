
// index.js (Backend entry point)
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Medication = require('./models/medication');
const Nurse = require('./models/nurse');
const Log = require('./models/log');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {})
  .then(async () => {
    console.log('✅ Connected to MongoDB');

    // ✅ Insert Sample Data (Uncomment if running for the first time)
    await Medication.insertMany([
      { name: 'Panado', category: 'Painkiller', quantity: 100, threshold: 20, supplier: 'HealthMed' },
      { name: 'ARV', category: 'HIV', quantity: 60, threshold: 25, supplier: 'LifeLine' },
      { name: 'Isoniazid', category: 'TB', quantity: 40, threshold: 15, supplier: 'MediPharm' },
      { name: 'Tamiflu', category: 'Flu', quantity: 50, threshold: 10, supplier: 'FluRelief' },
      { name: 'Chemoxal', category: 'Cancer', quantity: 30, threshold: 10, supplier: 'OncoSupplies' }
    ]);

    await Nurse.insertMany([
      { name: '', email: '', password: '' }
    ]);

    

    await Log.insertMany([
      { action: 'Issued medication', medication: 'Panado', nurse: 'Nurse Deli' },
      { action: 'Restocked', medication: 'ARV', nurse: 'Nurse Lungi' }
    ]);

    console.log('✅ Sample data inserted into all collections');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
// POST route to create a new nurse (Sign Up)
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Simple validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const existing = await Nurse.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Create and save new nurse
    const newNurse = new Nurse({ name, email, password });
    await newNurse.save();

    res.status(201).json({ message: 'Account created successfully' });
  } catch (err) {
    console.error('❌ Signup error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});
app.post('/api/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Check if nurse exists
    const nurse = await Nurse.findOne({ email });
    if (!nurse) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Basic password check (in real apps, use hashing)
    if (nurse.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Sign in successful', user: nurse.name });
  } catch (err) {
    console.error('❌ Signin error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Routes (basic)
app.get('/', (req, res) => {
  res.send('✅ Clinic Medication Availability System Backend is running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

