const Contact = require('../models/Contact');
const { getDbMode } = require('../config/db');
const { sendNotificationEmail } = require('../utils/emailService');

// Mock Contacts & Tips Store
let mockContacts = [
  {
    _id: 'mock_con_1',
    name: 'Suresh Patil',
    email: 'suresh.patil@yahoo.com',
    type: 'General',
    message: 'Greetings commanders, would love to organize a local MRD awareness offline seminar in Pune. Please let us know the logistics.',
    createdAt: new Date('2026-05-16T11:20:00Z')
  },
  {
    _id: 'mock_con_2',
    name: '',
    email: '',
    type: 'AnonymousTip',
    message: 'CRITICAL TIP: Identified a organized click-farm on social network platform spreading fabricated statistics regarding state health index. Source domain is running from host server: 104.244.42.1',
    createdAt: new Date('2026-05-18T23:05:00Z')
  }
];

// Submit confidential tip or contact query
const submitContact = async (req, res) => {
  try {
    const { name, email, type, message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message content is required.' });
    }

    if (type === 'General' && (!name || !email)) {
      return res.status(400).json({ error: 'General inquiries require name and email details.' });
    }

    const newContactData = {
      name: type === 'AnonymousTip' ? '' : name,
      email: type === 'AnonymousTip' ? '' : email,
      type: type || 'General',
      message,
      createdAt: new Date()
    };

    // Send email notification (non-blocking, errors caught gracefully)
    sendNotificationEmail({
      type: type || 'General',
      name: type === 'AnonymousTip' ? '' : name,
      email: type === 'AnonymousTip' ? '' : email,
      message
    }).catch(err => {
      console.error('Non-blocking sendNotificationEmail error:', err);
    });

    if (getDbMode()) {
      const mockId = `mock_con_${Date.now()}`;
      const createdMock = { _id: mockId, ...newContactData };
      mockContacts.unshift(createdMock);
      return res.status(201).json({
        message: type === 'AnonymousTip' 
          ? 'Confidential tip registered. Personally identifiable metadata has been excluded.'
          : 'Inquiry submitted successfully to the communications team.',
        contact: createdMock
      });
    }

    // Mongoose
    const newContact = new Contact(newContactData);
    await newContact.save();

    res.status(201).json({
      message: type === 'AnonymousTip' 
        ? 'Confidential tip registered. Personally identifiable metadata has been excluded.'
        : 'Inquiry submitted successfully to the communications team.',
      contact: newContact
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit message. Please try again.' });
  }
};

// Retrieve Contacts (admin permission)
const getContacts = async (req, res) => {
  try {
    if (getDbMode()) {
      // Return sorted by newest
      const sorted = [...mockContacts].sort((a, b) => b.createdAt - a.createdAt);
      return res.json({
        contacts: sorted,
        total: sorted.length
      });
    }

    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    const total = await Contact.countDocuments({});
    res.json({ contacts, total });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to access contact logs.' });
  }
};

module.exports = { submitContact, getContacts, mockContacts };
