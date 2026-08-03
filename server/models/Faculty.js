const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  qualification: { type: String, required: true },
  specialization: { type: String, required: true },
  email: { type: String, required: true },
  imageUrl: { type: String, default: null },
  publications: [{ type: String }],
  researchInterests: [{ type: String }],
  isHOD: { type: Boolean, default: false },
  displayOrder: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Faculty', facultySchema);
