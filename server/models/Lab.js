const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  equipmentList: [{ type: String }],
  subjectsSupported: [{ type: String }],
  displayOrder: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Lab', labSchema);
