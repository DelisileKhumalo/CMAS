const express = require('express');
const router = express.Router();
const Medication = require('../models/medication');

// Get all medications (for dashboard chart)
router.get('/', async (req, res) => {
  try {
    const medications = await Medication.find({}, 'name stock'); // only return name & stock
    res.json(medications);
  } catch (error) {
    console.error('Error fetching medications:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
