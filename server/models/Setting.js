const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  heroBannerUrl: { type: String },
  studentFacultyRatio: { type: String },
  placementRatio: { type: String },
  facultyCount: { type: String },
  rankingText: { type: String },
  phoneNumbers: [{ type: String }],
  email: { type: String },
  address: { type: String },
  socialLinks: {
    facebook: String,
    twitter: String,
    linkedin: String,
    instagram: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Setting', settingSchema);
