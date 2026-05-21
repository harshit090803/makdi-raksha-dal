require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const seedAdmin = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('❌ Error: MONGO_URI variable not found in .env! Seed aborted.');
    process.exit(1);
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@mrd.in';
  const adminPassword = process.env.ADMIN_PASSWORD || 'MRDCommandCenter2026';

  try {
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB for seeding...');

    // Check if admin already exists
    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      console.log(`⚠️  Admin user ${adminEmail} already exists.`);
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    const adminUser = new User({
      email: adminEmail,
      password: hashedPassword,
      role: 'admin'
    });

    await adminUser.save();
    console.log('🎉 Successfully seeded default Admin credentials!');
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Password: [REDACTED (configured via ADMIN_PASSWORD)]`);
    process.exit(0);

  } catch (err) {
    console.error('❌ Seeding failed with exception:', err);
    process.exit(1);
  }
};

seedAdmin();
