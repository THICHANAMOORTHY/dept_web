const { prisma } = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper to add _id alias to match frontend expectations (was MongoDB)
const normalizeId = (item) => {
  if (!item) return item;
  if (Array.isArray(item)) return item.map(i => ({ ...i, _id: i.id }));
  return { ...item, _id: item.id };
};

// Helper to get prisma model delegate (e.g. 'Faculty' -> prisma.faculty)
const getPrismaModel = (modelName) => {
  const key = modelName.charAt(0).toLowerCase() + modelName.slice(1);
  return prisma[key];
};

// Helper to clean/convert fields for Prisma model requirements
const sanitizeData = (modelName, bodyData) => {
  const data = { ...bodyData };

  // Remove undefined or invalid keys if needed
  delete data._id;
  delete data.__v;

  // Convert numeric strings to integers if present
  if (data.displayOrder !== undefined) data.displayOrder = parseInt(data.displayOrder) || 0;
  if (data.year !== undefined && data.year !== null) data.year = parseInt(data.year) || undefined;
  if (data.studentsPlaced !== undefined) data.studentsPlaced = parseInt(data.studentsPlaced) || 0;
  if (data.isHOD !== undefined) data.isHOD = data.isHOD === 'true' || data.isHOD === true;
  if (data.published !== undefined) data.published = data.published === 'true' || data.published === true;

  // Ensure array fields parsed if sent as JSON string or string
  const arrayFields = ['publications', 'researchInterests', 'equipmentList', 'subjectsSupported', 'studentNames', 'tags', 'phoneNumbers'];
  arrayFields.forEach((field) => {
    if (data[field] !== undefined) {
      if (typeof data[field] === 'string') {
        try {
          data[field] = JSON.parse(data[field]);
        } catch (e) {
          data[field] = data[field].split(',').map((s) => s.trim()).filter(Boolean);
        }
      }
    }
  });

  return data;
};

// Auth: Login
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await prisma.admin.findUnique({
      where: { username },
    });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '1d',
      });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Auth: Change Password
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Both current and new passwords are required.' });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'New password must be at least 6 characters.' });
  }
  try {
    // req.admin is set by protectAdmin middleware
    const admin = await prisma.admin.findUnique({ where: { id: req.admin.id } });
    if (!admin) return res.status(404).json({ message: 'Admin not found.' });

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Current password is incorrect.' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.admin.update({
      where: { id: admin.id },
      data: { password: hashedPassword },
    });
    res.json({ message: 'Password changed successfully.' });
  } catch (error) {
    console.error('changePassword error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    const facultyCount = await prisma.faculty.count();
    const newsCount = await prisma.news.count({ where: { published: true } });
    const activityCount = await prisma.activity.count();
    const enquiriesCount = await prisma.enquiry.count({ where: { status: 'New' } });

    const recentFaculty = await prisma.faculty.findMany({ take: 3, orderBy: { createdAt: 'desc' }, select: { name: true, designation: true, createdAt: true } });
    const recentNews = await prisma.news.findMany({ take: 3, orderBy: { createdAt: 'desc' }, select: { title: true, category: true, createdAt: true } });
    const recentEnquiries = await prisma.enquiry.findMany({ take: 3, orderBy: { createdAt: 'desc' }, select: { name: true, message: true, createdAt: true } });

    const recentActivity = [
      ...recentFaculty.map(f => ({ type: 'Faculty Added', title: `${f.name} (${f.designation})`, time: f.createdAt })),
      ...recentNews.map(n => ({ type: 'News Posted', title: n.title, time: n.createdAt })),
      ...recentEnquiries.map(e => ({ type: 'New Enquiry', title: `From ${e.name}`, time: e.createdAt }))
    ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 6);

    res.json({
      facultyCount,
      newsCount,
      galleryCount: activityCount,
      enquiriesCount,
      recentActivity
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAll = (modelName) => async (req, res) => {
  try {
    const model = getPrismaModel(modelName);
    const data = await model.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(normalizeId(data));
  } catch (error) {
    console.error(`getAll ${modelName} error:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createItem = (modelName) => async (req, res) => {
  try {
    let data = sanitizeData(modelName, req.body);
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
    const model = getPrismaModel(modelName);
    const item = await model.create({ data });
    res.status(201).json(normalizeId(item));
  } catch (error) {
    console.error(`createItem ${modelName} error:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateItem = (modelName) => async (req, res) => {
  try {
    let data = sanitizeData(modelName, req.body);
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
    const model = getPrismaModel(modelName);
    const item = await model.update({
      where: { id: req.params.id },
      data,
    });
    res.json(normalizeId(item));
  } catch (error) {
    console.error(`updateItem ${modelName} error:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteItem = (modelName) => async (req, res) => {
  try {
    const model = getPrismaModel(modelName);
    await model.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Item removed' });
  } catch (error) {
    console.error(`deleteItem ${modelName} error:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getSettings = async (req, res) => {
  try {
    let setting = await prisma.setting.findFirst();
    if (!setting) {
      setting = await prisma.setting.create({ data: {} });
    }
    res.json(normalizeId(setting));
  } catch (error) {
    console.error('getSettings error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    let setting = await prisma.setting.findFirst();
    let data = sanitizeData('Setting', req.body);

    if (req.file) {
      data.heroBannerUrl = `/uploads/${req.file.filename}`;
    }

    if (setting) {
      setting = await prisma.setting.update({
        where: { id: setting.id },
        data,
      });
    } else {
      setting = await prisma.setting.create({ data });
    }
    res.json(setting);
  } catch (error) {
    console.error('updateSettings error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateCurriculum = async (req, res) => {
  try {
    let setting = await prisma.setting.findFirst();
    if (!setting) {
      setting = await prisma.setting.create({ data: {} });
    }

    if (req.file) {
      const curriculumPdfUrl = `/uploads/${req.file.filename}`;
      setting = await prisma.setting.update({
        where: { id: setting.id },
        data: { curriculumPdfUrl },
      });
      res.json(setting);
    } else {
      res.status(400).json({ message: 'No file uploaded' });
    }
  } catch (error) {
    console.error('updateCurriculum error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  loginAdmin,
  changePassword,
  getDashboardStats,
  getAll,
  createItem,
  updateItem,
  deleteItem,
  getSettings,
  updateSettings,
  updateCurriculum
};
