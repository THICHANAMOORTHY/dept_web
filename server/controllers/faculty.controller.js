const { prisma } = require('../config/db');

// @desc    Get all faculty
// @route   GET /api/faculty
// @access  Public
const getFaculty = async (req, res) => {
  try {
    const faculty = await prisma.faculty.findMany({
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
    res.json(faculty);
  } catch (error) {
    console.error('getFaculty error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get faculty by ID
// @route   GET /api/faculty/:id
// @access  Public
const getFacultyById = async (req, res) => {
  try {
    const faculty = await prisma.faculty.findUnique({
      where: { id: req.params.id },
    });
    if (faculty) {
      res.json(faculty);
    } else {
      res.status(404).json({ message: 'Faculty not found' });
    }
  } catch (error) {
    console.error('getFacultyById error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getFaculty,
  getFacultyById,
};
