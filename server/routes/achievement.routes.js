const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');

router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ createdAt: -1 });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
