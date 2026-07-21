const express = require('express');
const router = express.Router();
const { prisma } = require('../config/db');

// Public route to get settings
router.get('/', async (req, res) => {
  try {
    let setting = await prisma.setting.findFirst();
    if (!setting) {
      setting = await prisma.setting.create({ data: {} });
    }
    res.json(setting);
  } catch (error) {
    console.error('get settings error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
