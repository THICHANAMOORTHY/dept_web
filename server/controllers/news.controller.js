const { prisma } = require('../config/db');

const getNews = async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      orderBy: { date: 'desc' },
    });
    res.json(news);
  } catch (error) {
    console.error('getNews error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getNews };
