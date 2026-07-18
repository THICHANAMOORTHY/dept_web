const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');

// Public route to get settings
router.get('/', async (req, res) => {
  try {
    let setting = await Setting.findOne();
    if (!setting) {
      setting = await Setting.create({});
    }
    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
