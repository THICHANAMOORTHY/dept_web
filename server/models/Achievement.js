const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  studentNames: [{ type: String }],
  year: { type: Number },
  description: { type: String },
  imageUrl: { type: String },
  tags: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);
