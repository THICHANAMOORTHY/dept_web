const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ['New', 'Contacted', 'Closed'], default: 'New' }
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', enquirySchema);
