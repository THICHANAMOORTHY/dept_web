const Lab = require('../models/Lab');

// @desc    Get all labs
// @route   GET /api/labs
// @access  Public
const getLabs = async (req, res) => {
  try {
    const labs = await Lab.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json(labs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get lab by ID
// @route   GET /api/labs/:id
// @access  Public
const getLabById = async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.id);
    if (lab) {
      res.json(lab);
    } else {
      res.status(404).json({ message: 'Lab not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getLabs,
  getLabById
};
