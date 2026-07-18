const express = require('express');
const router = express.Router();
const { getLabs, getLabById } = require('../controllers/lab.controller');

router.route('/').get(getLabs);
router.route('/:id').get(getLabById);

module.exports = router;
