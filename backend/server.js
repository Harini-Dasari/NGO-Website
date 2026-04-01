const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const volunteerRoutes = require('./routes/volunteerRoutes');
const contactRoutes = require('./routes/contactRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Global middleware configuration
app.use(cors());
app.use(express.json());

// Health check route for uptime monitoring
app.get('/', (req, res) => {
  res.send('API Running');
});

// API routes
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/gallery', galleryRoutes);

// Error handler should be the last middleware in the stack.
app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
