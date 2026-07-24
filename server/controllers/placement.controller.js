const { prisma } = require('../config/db');

const normalizeId = (item) => {
  if (!item) return item;
  if (Array.isArray(item)) return item.map(i => ({ ...i, _id: i.id }));
  return { ...item, _id: item.id };
};

const getPlacements = async (req, res) => {
  try {
    const placements = await prisma.placement.findMany({
      orderBy: { year: 'desc' },
    });
    res.json(normalizeId(placements));
  } catch (error) {
    console.error('getPlacements error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getPlacements };
