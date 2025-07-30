const mongoose = require('mongoose');

const nurseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model('Nurse', nurseSchema);
