const mongoose = require('mongoose');

/**
 * Establishes a connection to MongoDB using the connection string
 * stored in the MONGO_URI environment variable.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
