const express = require('express');
const router = express.Router();
const { prisma } = require('../config/db');

// Public route to get settings
router.get('/', async (req, res) => {
  try {
    let setting = await prisma.setting.findFirst();
    if (!setting) {
      setting = await prisma.setting.create({
        data: {
          address: 'NH-47, Palakkad Main Road, Navakkarai, Coimbatore, Tamil Nadu - 641105',
          phoneNumbers: ['+91-9364445555', '0422-2656871'],
          email: 'info@easacollege.com'
        }
      });
    } else {
      if (!setting.address) setting.address = 'NH-47, Palakkad Main Road, Navakkarai, Coimbatore, Tamil Nadu - 641105';
      if (!setting.phoneNumbers || setting.phoneNumbers.length === 0) setting.phoneNumbers = ['+91-9364445555', '0422-2656871'];
      if (!setting.email) setting.email = 'info@easacollege.com';
    }
    res.json(setting);
  } catch (error) {
    console.error('get settings error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
