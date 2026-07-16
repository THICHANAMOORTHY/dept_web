const Admin = require('../models/Admin');
const Faculty = require('../models/Faculty');
const News = require('../models/News');
const Gallery = require('../models/Gallery');
const Lab = require('../models/Lab');
const Placement = require('../models/Placement');
const Project = require('../models/Project');
const Enquiry = require('../models/Enquiry');
const Setting = require('../models/Setting');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Auth: Login
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '1d',
      });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    const facultyCount = await Faculty.countDocuments();
    const newsCount = await News.countDocuments({ published: true });
    const galleryCount = await Gallery.countDocuments();
    const enquiriesCount = await Enquiry.countDocuments({ status: 'New' });

    res.json({
      facultyCount,
      newsCount,
      galleryCount,
      enquiriesCount,
      recentActivity: [] // placeholder for now
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Generic CRUD handlers
const getModel = (modelName) => {
  const models = { Faculty, News, Gallery, Lab, Placement, Project, Enquiry, Setting };
  return models[modelName];
};

const getAll = (modelName) => async (req, res) => {
  try {
    const data = await getModel(modelName).find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createItem = (modelName) => async (req, res) => {
  try {
    let data = { ...req.body };
    if (req.file) {
      // Assuming all image fields are named differently based on model, but we can standardise on imageUrl or thumbnailUrl
      if (modelName === 'News') data.thumbnailUrl = `/uploads/${req.file.filename}`;
      else if (modelName === 'Placement') data.logoUrl = `/uploads/${req.file.filename}`;
      else data.imageUrl = `/uploads/${req.file.filename}`;
    }
    const item = await getModel(modelName).create(data);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateItem = (modelName) => async (req, res) => {
  try {
    let data = { ...req.body };
    if (req.file) {
      if (modelName === 'News') data.thumbnailUrl = `/uploads/${req.file.filename}`;
      else if (modelName === 'Placement') data.logoUrl = `/uploads/${req.file.filename}`;
      else data.imageUrl = `/uploads/${req.file.filename}`;
    }
    const item = await getModel(modelName).findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteItem = (modelName) => async (req, res) => {
  try {
    await getModel(modelName).findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getSettings = async (req, res) => {
  try {
    let setting = await Setting.findOne();
    if (!setting) {
      setting = await Setting.create({});
    }
    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateSettings = async (req, res) => {
  try {
    let setting = await Setting.findOne();
    if (req.file) {
      req.body.heroBannerUrl = `/uploads/${req.file.filename}`;
    }
    
    // Parse social links if sent as string
    if (typeof req.body.socialLinks === 'string') {
      req.body.socialLinks = JSON.parse(req.body.socialLinks);
    }

    if (setting) {
      Object.assign(setting, req.body);
      await setting.save();
    } else {
      setting = await Setting.create(req.body);
    }
    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  loginAdmin,
  getDashboardStats,
  getAll,
  createItem,
  updateItem,
  deleteItem,
  getSettings,
  updateSettings
};
