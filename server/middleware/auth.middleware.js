const jwt = require('jsonwebtoken');
const { prisma } = require('../config/db');

const protectAdmin = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: { id: true, username: true, createdAt: true, updatedAt: true }
    });
    if (!admin) {
      return res.status(401).json({ message: 'Not authorized, admin not found' });
    }
    req.admin = admin;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = { protectAdmin };
