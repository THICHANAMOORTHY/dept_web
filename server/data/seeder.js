const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');

// Models
const Faculty = require('../models/Faculty');
const News = require('../models/News');
const Placement = require('../models/Placement');

// Mock Data
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
    title: "5-Day Online FDP on AI-Based Signal Processing – Speech, Image and Wireless Data Intelligence",
    content: "The Department of Electronics and Communication Engineering, EASA College of Engineering and Technology (Coimbatore), organized a 5-Day Online Faculty Development Programme (FDP) on \"AI-Based Signal Processing – Speech, Image and Wireless Data Intelligence,\" commencing 18 December 2025.\n\n[Add: resource persons/speakers, registration/participation details, and target audience — e.g. faculty/research scholars/students — once available]",
    type: "announcement",
    date: new Date("2025-12-18"),
    category: "Faculty Development Program (FDP)",
    shortDescription: "A 5-day online Faculty Development Program covering AI-based signal processing applications in speech, image, and wireless data intelligence, organized by the ECE Department, EASA College of Engineering and Technology, Coimbatore.",
    published: true
  },
  {
    title: "Important Update – GTT Foundation × Accenture Advanced EV Training Program",
    content: "GTT Foundation – Accenture Advanced EV CSR Training Program begins 15 July 2026, conducted in two phases at the college campus and Chennai.",
    type: "news",
    date: new Date("2026-07-14"),
    category: "Training & Placement",
    shortDescription: "GTT Foundation – Accenture Advanced EV CSR Training Program begins 15 July 2026, conducted in two phases at the college campus and Chennai."
  },
  {
    title: "NBA Accreditation Renewed",
    content: "The B.E. ECE program has been accredited by NBA for another 3 years.",
    type: "news"
  },
  {
    title: "International Conference on VLSI",
    content: "Call for papers is now open for ICVLSI 2026. Submit your abstracts by August.",
    type: "announcement"
  },
  {
    title: "Alumni Meet 2026 Scheduled",
    content: "Annual alumni meet will be held on December 15th.",
    type: "announcement"
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

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Faculty.deleteMany();
    await News.deleteMany();
    await Placement.deleteMany();

    await Faculty.insertMany(facultyData);
    await News.insertMany(newsData);
    await Placement.insertMany(placementData);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();
