const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Lab = require('../models/Lab');

dotenv.config();

const labsData = [
  {
    "name": "Circuits and Devices Laboratory",
    "description": "Foundation lab for studying the characteristics of basic electronic devices such as diodes, transistors, and semiconductors, building the groundwork for analog circuit design.",
    "subjectsSupported": ["Basic Electronic Devices"],
    "imageUrl": "",
    "equipmentList": ["Multimeters", "DC power supplies", "Breadboards", "CRO", "Function generators"],
    "displayOrder": 1
  },
  {
    "name": "Analog and Digital Circuits Laboratory",
    "description": "Hands-on design, construction, and testing of analog circuits (amplifiers, oscillators) and digital logic circuits (gates, flip-flops, counters).",
    "subjectsSupported": ["Digital Electronics", "Analog Electronics"],
    "imageUrl": "",
    "equipmentList": ["Digital trainer kits", "IC trainer boards", "Oscilloscopes", "Signal generators"],
    "displayOrder": 2
  },
  {
    "name": "Circuits and Simulation Integrated Laboratory",
    "description": "Simulation-based lab for verifying circuit behavior using EDA/CAD tools before hardware implementation, bridging theory and simulation.",
    "subjectsSupported": ["Signals and Systems", "Circuit Theory"],
    "imageUrl": "",
    "equipmentList": ["PC workstations", "SPICE/MATLAB simulation software"],
    "displayOrder": 3
  },
  {
    "name": "Linear Integrated Circuits Laboratory",
    "description": "Design and testing of op-amp based circuits including filters, oscillators, comparators, and instrumentation amplifiers.",
    "subjectsSupported": ["Linear Integrated Circuits and Applications"],
    "imageUrl": "",
    "equipmentList": ["Op-amp ICs", "Trainer kits", "CRO", "Power supplies"],
    "displayOrder": 4
  },
  {
    "name": "Electrical Engineering and Control System Laboratory",
    "description": "Practical exposure to control system modeling, stability analysis, and controller tuning alongside core electrical engineering principles.",
    "subjectsSupported": ["Control System Engineering"],
    "imageUrl": "",
    "equipmentList": ["Control system trainer kits", "PID controllers", "Simulation software"],
    "displayOrder": 5
  },
  {
    "name": "Digital Signal Processing Laboratory",
    "description": "Implementation of signal and image processing algorithms using DSP processors and simulation tools to reinforce theoretical DSP concepts.",
    "subjectsSupported": ["Digital Signal Processing", "Digital Image Processing"],
    "imageUrl": "",
    "equipmentList": ["DSP trainer kits", "MATLAB", "Computers"],
    "displayOrder": 6
  },
  {
    "name": "Communication Systems Laboratory",
    "description": "Hands-on experiments in analog and digital modulation techniques, giving students practical understanding of communication system design.",
    "subjectsSupported": ["Analog and Digital Communications", "Wireless Communication"],
    "imageUrl": "",
    "equipmentList": ["AM/FM modulation trainer kits", "Digital modulation kits (ASK/FSK/PSK)", "CRO", "Spectrum analyzer"],
    "displayOrder": 7
  }
];

const seedLabs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ece_elites');

    await Lab.deleteMany();
    await Lab.insertMany(labsData);

    console.log('Labs data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error seeding labs: ${error.message}`);
    process.exit(1);
  }
};

seedLabs();
