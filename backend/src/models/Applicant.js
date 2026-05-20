const mongoose = require('mongoose');

const ApplicantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: function() { return !this.anonymousMode; }
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: function() { return !this.anonymousMode; },
    trim: true,
    lowercase: true
  },
  state: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    default: []
  },
  whyJoin: {
    type: String,
    required: true
  },
  anonymousMode: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Applicant', ApplicantSchema);
