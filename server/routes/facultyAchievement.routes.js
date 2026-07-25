const express = require('express');
const router = express.Router();
const { prisma } = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const achievements = await prisma.facultyAchievement.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(achievements);
  } catch (error) {
    console.error('get faculty achievements error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
