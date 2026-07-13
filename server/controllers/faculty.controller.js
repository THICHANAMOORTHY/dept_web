const Faculty = require('../models/Faculty');

// @desc    Get all faculty
// @route   GET /api/faculty
// @access  Public
const getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get faculty by ID
// @route   GET /api/faculty/:id
// @access  Public
const getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (faculty) {
      res.json(faculty);
    } else {
      res.status(404).json({ message: 'Faculty not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getFaculty,
  getFacultyById
};
