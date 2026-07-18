const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const connectDB = require('../config/db');

// Models
const Faculty = require('../models/Faculty');
const News = require('../models/News');
const Placement = require('../models/Placement');
const Lab = require('../models/Lab');
const Achievement = require('../models/Achievement');

dotenv.config();
connectDB();

const importCustomData = async () => {
  try {
    const rawData = fs.readFileSync('e:/New Folder/ece-elites/db.json', 'utf8');
    const dbData = JSON.parse(rawData);

    // Delete existing data to replace it
    await Faculty.deleteMany();
    await News.deleteMany();
    await Placement.deleteMany();
    await Lab.deleteMany();
    await Achievement.deleteMany();

    // Transform and Insert Faculty
    if (dbData.faculty) {
      const facultyDocs = dbData.faculty.map(f => ({
        name: f.name,
        designation: f.title.split(',')[0].trim() || 'Faculty',
        qualification: 'N/A', // fallback
        specialization: f.title.split(',')[1]?.trim() || 'ECE',
        email: f.name.replace(/\s+/g, '').toLowerCase() + '@dept.edu',
        imageUrl: f.image || 'https://via.placeholder.com/150',
        researchInterests: f.badge ? [f.badge] : [],
        isHOD: f.name.includes('Sivakumar') // Arbitrary logic if needed
      }));
      await Faculty.insertMany(facultyDocs);
    }

    // Transform and Insert News
    if (dbData.news) {
      const newsDocs = dbData.news.map(n => ({
        title: n.text,
        content: n.text,
        type: 'news',
        category: 'General',
        published: true
      }));
      await News.insertMany(newsDocs);
    }

    // Transform and Insert Placements
    if (dbData.placements) {
      const placementDocs = dbData.placements.map(p => ({
        company: p.company,
        package: 'TBD',
        year: 2026,
        studentsPlaced: 1,
        logoUrl: 'https://via.placeholder.com/150'
      }));
      await Placement.insertMany(placementDocs);
    }

    // Transform and Insert Labs
    if (dbData.labs) {
      const labDocs = dbData.labs.map(l => ({
        name: l.name,
        description: l.description,
        imageUrl: l.image,
        equipments: []
      }));
      await Lab.insertMany(labDocs);
    }

    // Transform and Insert Achievements
    if (dbData.achievements) {
      const achievementDocs = dbData.achievements.map(a => ({
        title: a.title,
        description: a.description,
        tags: a.icon ? [a.icon] : []
      }));
      await Achievement.insertMany(achievementDocs);
    }

    console.log('Custom Data from db.json Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with custom data import: ${error.message}`);
    process.exit(1);
  }
};

importCustomData();
