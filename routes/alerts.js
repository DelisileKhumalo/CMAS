const express = require('express');
const router = express.Router();
const Medication = require('../models/medication');
const Log = require('../models/log');
const predictDaysLeft = require('../utils/PredictStockDepletion');

const ALERT_THRESHOLD_DAYS = 5; // can adjust this value

router.get('/predicted', async (req, res) => {
  try {
    const medications = await Medication.find();
    const alerts = [];

    for (const med of medications) {
      const logs = await Log.find({ medicationId: med._id }).sort({ date: 1 });

      if (logs.length === 0) continue;

      const daysLeft = predictDaysLeft(logs, med.stock);

      if (daysLeft < ALERT_THRESHOLD_DAYS) {
        alerts.push({
          medication: med.name,
          stock: med.stock,
          predictedDaysLeft: Math.round(daysLeft),
          alert: `Low stock! Predicted to run out in ${Math.round(daysLeft)} day(s).`
        });
      }
    }

    res.json(alerts);
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ message: 'Error predicting stock depletion.' });
  }
});

module.exports = router;
