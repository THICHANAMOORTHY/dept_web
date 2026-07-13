const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema({
  company: { type: String, required: true },
  package: { type: String, required: true },
  year: { type: Number, required: true },
  studentsPlaced: { type: Number, required: true },
  logoUrl: { type: String, default: 'https://via.placeholder.com/100' }
}, { timestamps: true });

module.exports = mongoose.model('Placement', placementSchema);
