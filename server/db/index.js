const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://localhost:27017/cannabis'
    );
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Connection Error:', err.message);
    // process.exit(1); // Comment out to not exit
  }
};

connectDB();

module.exports = connectDB;
