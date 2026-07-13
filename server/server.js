const express = require('express');
const cors = require('cors');
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

const facultyRoutes = require('./routes/faculty.routes');
const newsRoutes = require('./routes/news.routes');
const placementRoutes = require('./routes/placement.routes');

app.use('/api/faculty', facultyRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/placements', placementRoutes);

// Routes (to be added)
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
