const express = require('express');
const router = express.Router();
const {
  loginAdmin,
  getDashboardStats,
  getAll,
  createItem,
  updateItem,
  deleteItem,
  getSettings,
  updateSettings
} = require('../controllers/admin.controller');
const { protectAdmin } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

// Auth
router.post('/login', loginAdmin);

// Dashboard
router.get('/dashboard', protectAdmin, getDashboardStats);

// Helper to generate routes for a module
const generateRoutes = (path, modelName) => {
  router.get(`/${path}`, protectAdmin, getAll(modelName));
  router.post(`/${path}`, protectAdmin, upload.single('image'), createItem(modelName));
  router.put(`/${path}/:id`, protectAdmin, upload.single('image'), updateItem(modelName));
  router.delete(`/${path}/:id`, protectAdmin, deleteItem(modelName));
};

generateRoutes('faculty', 'Faculty');
generateRoutes('news', 'News');
generateRoutes('labs', 'Lab');
generateRoutes('placements', 'Placement');
generateRoutes('achievements', 'Achievement');
generateRoutes('enquiries', 'Enquiry'); // For enquiries, createItem isn't used by admin, but we keep the structure

// Custom Activities Routes (multiple images)
router.get('/activities', protectAdmin, getAll('Activity'));
router.post('/activities', protectAdmin, upload.array('images', 10), createItem('Activity'));
router.put('/activities/:id', protectAdmin, upload.array('images', 10), updateItem('Activity'));
router.delete('/activities/:id', protectAdmin, deleteItem('Activity'));

// Settings
router.get('/settings', protectAdmin, getSettings);
router.put('/settings', protectAdmin, upload.single('image'), updateSettings);

module.exports = router;
