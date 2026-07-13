const express = require('express');
const router = express.Router();
const { getNews } = require('../controllers/news.controller');

router.route('/').get(getNews);

module.exports = router;
