const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');

// Public route to get all activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
