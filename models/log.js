const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  medicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medication',
    required: true,
  },
  quantityUsed: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  nurse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nurse',
  },
});

module.exports = mongoose.model('Log', logSchema);
