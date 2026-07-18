const Admin = require('../models/Admin');
const Faculty = require('../models/Faculty');
const News = require('../models/News');
const Activity = require('../models/Activity');
const Lab = require('../models/Lab');
const Placement = require('../models/Placement');
const Achievement = require('../models/Achievement');
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
    const activityCount = await Activity.countDocuments();
    const enquiriesCount = await Enquiry.countDocuments({ status: 'New' });

    res.json({
      facultyCount,
      newsCount,
      activityCount,
      enquiriesCount,
      recentActivity: [] // placeholder for now
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Generic CRUD handlers
const getModel = (modelName) => {
  const models = { Faculty, News, Activity, Lab, Placement, Achievement, Enquiry, Setting };
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
      if (modelName === 'News') data.thumbnailUrl = `/uploads/${req.file.filename}`;
      else if (modelName === 'Placement') data.logoUrl = `/uploads/${req.file.filename}`;
      else data.imageUrl = `/uploads/${req.file.filename}`;
    }
    if (req.files && req.files.length > 0) {
      if (modelName === 'Activity') {
        data.images = req.files.map(file => `/uploads/${file.filename}`);
        if (data.images.length > 0) data.imageUrl = data.images[0];
      }
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
    if (req.files && req.files.length > 0) {
      if (modelName === 'Activity') {
        data.images = req.files.map(file => `/uploads/${file.filename}`);
        if (data.images.length > 0) data.imageUrl = data.images[0];
      }
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
