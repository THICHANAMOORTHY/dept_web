const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const facultyRoutes = require('./routes/faculty.routes');
const newsRoutes = require('./routes/news.routes');
const placementRoutes = require('./routes/placement.routes');
const adminRoutes = require('./routes/admin.routes');
const activityRoutes = require('./routes/activity.routes');
const achievementRoutes = require('./routes/achievement.routes');
const settingsRoutes = require('./routes/settings.routes');
const labRoutes = require('./routes/lab.routes');

app.use('/api/faculty', facultyRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/placements', placementRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/labs', labRoutes);

// Routes (to be added)
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
