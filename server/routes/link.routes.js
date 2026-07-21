const express = require('express');
const router = express.Router();
const { prisma } = require('../config/db');

// @desc    Get all quick links
// @route   GET /api/links
// @access  Public
router.get('/', async (req, res) => {
  try {
    const links = await prisma.quickLink.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(links.map(link => ({ ...link, _id: link.id })));
  } catch (error) {
    console.error('Error fetching quick links:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
