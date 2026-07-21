const { prisma } = require('../config/db');

const getPlacements = async (req, res) => {
  try {
    const placements = await prisma.placement.findMany({
      orderBy: { year: 'desc' },
    });
    res.json(placements);
  } catch (error) {
    console.error('getPlacements error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getPlacements };
