const { prisma } = require('../config/db');

// @desc    Get all labs
// @route   GET /api/labs
// @access  Public
const getLabs = async (req, res) => {
  try {
    const labs = await prisma.lab.findMany({
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
    res.json(labs);
  } catch (error) {
    console.error('getLabs error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get lab by ID
// @route   GET /api/labs/:id
// @access  Public
const getLabById = async (req, res) => {
  try {
    const lab = await prisma.lab.findUnique({
      where: { id: req.params.id },
    });
    if (lab) {
      res.json(lab);
    } else {
      res.status(404).json({ message: 'Lab not found' });
    }
  } catch (error) {
    console.error('getLabById error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getLabs,
  getLabById,
};
