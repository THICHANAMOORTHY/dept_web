const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS - allow Vercel frontend and localhost
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL, // set this in production env vars
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (e.g. mobile apps, curl, Render health checks)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

const facultyRoutes = require('./routes/faculty.routes');
const newsRoutes = require('./routes/news.routes');
const placementRoutes = require('./routes/placement.routes');
const adminRoutes = require('./routes/admin.routes');
const activityRoutes = require('./routes/activity.routes');
const achievementRoutes = require('./routes/achievement.routes');
const settingsRoutes = require('./routes/settings.routes');
const labRoutes = require('./routes/lab.routes');
const linkRoutes = require('./routes/link.routes');
const facultyAchievementRoutes = require('./routes/facultyAchievement.routes');

app.use('/api/faculty', facultyRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/placements', placementRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/labs', labRoutes);
app.use('/api/links', linkRoutes);
app.use('/api/faculty-achievements', facultyAchievementRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;


