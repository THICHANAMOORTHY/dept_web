const express = require('express');
const router = express.Router();
const { getFaculty, getFacultyById } = require('../controllers/faculty.controller');

router.route('/').get(getFaculty);
router.route('/:id').get(getFacultyById);

module.exports = router;
