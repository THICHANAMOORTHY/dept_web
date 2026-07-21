const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('Prisma connected to Database successfully');
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    // Don't crash immediately so server can attempt requests or show clearer errors if DB credentials aren't set yet
  }
};

module.exports = { prisma, connectDB };
