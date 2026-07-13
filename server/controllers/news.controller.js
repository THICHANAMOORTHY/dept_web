const News = require('../models/News');

const getNews = async (req, res) => {
  try {
    const news = await News.find().sort('-date');
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getNews };
