const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function inspectDatabase() {
  console.log('=== DATABASE STATUS & RECORD COUNT ===');
  
  const adminCount = await prisma.admin.count();
  const facultyCount = await prisma.faculty.count();
  const newsCount = await prisma.news.count();
  const activityCount = await prisma.activity.count();
  const labCount = await prisma.lab.count();
  const placementCount = await prisma.placement.count();
  const achievementCount = await prisma.achievement.count();
  const enquiryCount = await prisma.enquiry.count();
  const settingCount = await prisma.setting.count();

  console.log(`- Admin Accounts  : ${adminCount}`);
  console.log(`- Faculty Members : ${facultyCount}`);
  console.log(`- News Articles   : ${newsCount}`);
  console.log(`- Activities      : ${activityCount}`);
  console.log(`- Labs            : ${labCount}`);
  console.log(`- Placements      : ${placementCount}`);
  console.log(`- Achievements    : ${achievementCount}`);
  console.log(`- Enquiries       : ${enquiryCount}`);
  console.log(`- Settings Record : ${settingCount}`);

  const admins = await prisma.admin.findMany({ select: { id: true, username: true, createdAt: true } });
  console.log('\n--- Admin Users ---');
  console.table(admins);

  await prisma.$disconnect();
}

inspectDatabase().catch((err) => {
  console.error('Error inspecting database:', err);
  process.exit(1);
});
