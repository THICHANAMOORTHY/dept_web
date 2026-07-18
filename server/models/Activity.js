const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String },
  images: [{ type: String }],
  category: { type: String, default: 'General' },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
