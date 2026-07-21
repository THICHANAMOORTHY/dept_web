const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();
const prisma = new PrismaClient();

const seedAdmin = async () => {
  try {
    const existingAdmin = await prisma.admin.findUnique({ where: { username: 'admin' } });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    await prisma.admin.create({
      data: {
        username: 'admin',
        password: hashedPassword,
      },
    });

    console.log('Admin user seeded successfully (username: admin, password: admin123)');
    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
