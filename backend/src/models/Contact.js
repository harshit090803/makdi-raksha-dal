const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: function() { return this.type === 'General'; }
  },
  email: {
    type: String,
    required: function() { return this.type === 'General'; },
    trim: true,
    lowercase: true
  },
  type: {
    type: String,
    enum: ['General', 'AnonymousTip'],
    default: 'General'
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', ContactSchema);
