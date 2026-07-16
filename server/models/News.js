const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ['news', 'announcement'], default: 'news' },
  category: { type: String },
  shortDescription: { type: String },
  thumbnailUrl: { type: String },
  published: { type: Boolean, default: false },
  link: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);
