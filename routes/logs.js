const express = require('express');
const router = express.Router();
const Log = require('../models/log');
const mongoose = require('mongoose');

// Usage summary grouped by day
router.get('/summary', async (req, res) => {
  try {
    const summary = await Log.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$date' }
          },
          totalUsed: { $sum: '$quantityUsed' }
        }
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          date: '$_id',
          totalUsed: 1,
          _id: 0
        }
      }
    ]);

    res.json(summary);
  } catch (error) {
    console.error('Error fetching usage summary:', error);
    res.status(500).json({ message: 'Failed to fetch usage data.' });
  }
});

module.exports = router;
