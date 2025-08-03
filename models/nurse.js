
const mongoose = require('mongoose');

const nurseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'nurse' }
});

module.exports = mongoose.model('Nurse', nurseSchema);
