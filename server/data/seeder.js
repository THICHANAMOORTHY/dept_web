const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();
const prisma = new PrismaClient();

const facultyData = [
  {
    name: "Dr. A. Sharma",
    designation: "Professor & HOD",
    qualification: "Ph.D. in VLSI Design",
    specialization: "VLSI, Embedded Systems",
    email: "hod.ece@dept.edu",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    publications: ["IEEE Trans. on VLSI Systems", "Journal of Electronic Testing"],
    researchInterests: ["Low Power VLSI", "FPGA"],
    isHOD: true
  },
  {
    name: "Dr. B. Patel",
    designation: "Associate Professor",
    qualification: "Ph.D. in Signal Processing",
    specialization: "DSP, Image Processing",
    email: "b.patel@dept.edu",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    publications: ["IEEE Signal Processing Letters"],
    researchInterests: ["Medical Image Processing", "Machine Learning"],
    isHOD: false
  },
  {
    name: "Prof. C. Kumar",
    designation: "Assistant Professor",
    qualification: "M.Tech in Communication Systems",
    specialization: "Wireless Communication",
    email: "c.kumar@dept.edu",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
    publications: ["International Journal of Communication"],
    researchInterests: ["5G Networks", "IoT"],
    isHOD: false
  }
];

const newsData = [
  {
    title: "5-Day Online FDP on AI-Based Signal Processing",
    content: "The Department of Electronics and Communication Engineering organized a 5-Day Online Faculty Development Programme (FDP).",
    type: "announcement",
    date: new Date("2025-12-18"),
    category: "Faculty Development Program (FDP)",
    shortDescription: "A 5-day online Faculty Development Program covering AI-based signal processing.",
    published: true
  },
  {
    title: "GTT Foundation × Accenture Advanced EV Training Program",
    content: "Advanced EV CSR Training Program conducted in two phases at the college campus and Chennai.",
    type: "news",
    date: new Date("2026-07-14"),
    category: "Training & Placement",
    shortDescription: "EV CSR Training Program in two phases.",
    published: true
  },
  {
    title: "NBA Accreditation Renewed",
    content: "The B.E. ECE program has been accredited by NBA for another 3 years.",
    type: "news",
    published: true
  }
];

const placementData = [
  {
    company: "Intel",
    package: "24 LPA",
    year: 2025,
    studentsPlaced: 12,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/85/Intel_logo_2020_c.png"
  },
  {
    company: "Qualcomm",
    package: "32 LPA",
    year: 2025,
    studentsPlaced: 5,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Qualcomm_Snapdragon_logo.svg"
  },
  {
    company: "TCS (Digital)",
    package: "7.5 LPA",
    year: 2024,
    studentsPlaced: 45,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg"
  }
];

const importData = async () => {
  try {
    await prisma.faculty.deleteMany();
    await prisma.news.deleteMany();
    await prisma.placement.deleteMany();

    await prisma.faculty.createMany({ data: facultyData });
    await prisma.news.createMany({ data: newsData });
    await prisma.placement.createMany({ data: placementData });

    console.log('Sample data imported successfully into database!');
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

importData();
