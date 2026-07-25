const mongoose = require('mongoose');

const facultyAchievementSchema = new mongoose.Schema({
  title: { type: String },
  name: { type: String, required: true },
  award: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  year: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('FacultyAchievement', facultyAchievementSchema);
