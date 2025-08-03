
const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  quantity: { type: Number, required: true },
  threshold: { type: Number, required: true },
  supplier: { type: String },
  dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Medication', medicationSchema);
