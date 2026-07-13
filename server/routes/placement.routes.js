const express = require('express');
const router = express.Router();
const { getPlacements } = require('../controllers/placement.controller');

router.route('/').get(getPlacements);

module.exports = router;
