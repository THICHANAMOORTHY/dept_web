const Placement = require('../models/Placement');

const getPlacements = async (req, res) => {
  try {
    const placements = await Placement.find().sort('-year');
    res.json(placements);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getPlacements };
