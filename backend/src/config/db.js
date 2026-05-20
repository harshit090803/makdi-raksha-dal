const mongoose = require('mongoose');

let isMockMode = false;

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.log('======================================================================');
    console.log('⚠️  WARNING: MONGO_URI environment variable is missing.');
    console.log('🚀 Running backend in MOCK DATABASE MODE (In-Memory Array Data Store).');
    console.log('======================================================================');
    isMockMode = true;
    return;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout
    });
    console.log('✅ MongoDB Atlas connected successfully.');
  } catch (err) {
    console.log('======================================================================');
    console.log(`⚠️  WARNING: Failed to connect to MongoDB: ${err.message}`);
    console.log('🚀 Falling back to MOCK DATABASE MODE (In-Memory Array Data Store).');
    console.log('======================================================================');
    isMockMode = true;
  }
};

const getDbMode = () => isMockMode;

module.exports = { connectDB, getDbMode };
