const express = require('express');
const router = express.Router();
const { prisma } = require('../config/db');

// Public route to get all activities
router.get('/', async (req, res) => {
  try {
    const activities = await prisma.activity.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(activities);
  } catch (error) {
    console.error('get activities error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
