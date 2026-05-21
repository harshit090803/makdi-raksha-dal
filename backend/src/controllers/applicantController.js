const Applicant = require('../models/Applicant');
const { getDbMode } = require('../config/db');

// Mock Applicant Store pre-populated with highly realistic cyber political candidates
let mockApplicants = [
  {
    _id: 'mock_app_1',
    name: 'Aravind Sharma',
    username: 'netwatcher_aravind',
    email: 'aravind.sharma@gmail.com',
    state: 'Delhi',
    occupation: 'Cyber Security Analyst',
    skills: ['Cyber Surveillance', 'Network Threat Analysis', 'Fact Verification'],
    whyJoin: 'I want to help build a factual cyber narrative. Misinformation is harming national interest. MRD has the right roadmap.',
    anonymousMode: false,
    status: 'Approved',
    createdAt: new Date('2026-05-18T10:30:00Z')
  },
  {
    _id: 'mock_app_2',
    name: '',
    username: 'spider_phantom',
    email: '',
    state: 'Maharashtra',
    occupation: 'Software Engineer',
    skills: ['React', 'Node.js', 'Cryptography', 'Anonymity Tools'],
    whyJoin: 'The web needs clean accountability without chaos. Ready to design secure networks for the Dal.',
    anonymousMode: true,
    status: 'Approved',
    createdAt: new Date('2026-05-17T14:45:00Z')
  },
  {
    _id: 'mock_app_3',
    name: 'Priyah Deshmukh',
    username: 'priyah_narratives',
    email: 'priyah.deshmukh@outlook.com',
    state: 'Karnataka',
    occupation: 'Journalist & Researcher',
    skills: ['Content Design', 'Open Source Intelligence (OSINT)', 'Discipline'],
    whyJoin: 'Propaganda has ruined the public square. I want to build a solution-driven, nation-first critique network.',
    anonymousMode: false,
    status: 'Approved',
    createdAt: new Date('2026-05-15T09:12:00Z')
  },
  {
    _id: 'mock_app_4',
    name: 'Rohan Verma',
    username: 'rohan_nationalist',
    email: 'rohan.verma@yahoo.com',
    state: 'Uttar Pradesh',
    occupation: 'Political Science Student',
    skills: ['Public Relations', 'Strategic Communication', 'Youth Leadership'],
    whyJoin: 'Traditional political models are broken. The youth needs smart, cyber-driven, disciplined activism.',
    anonymousMode: false,
    status: 'Approved',
    createdAt: new Date('2026-05-19T16:20:00Z')
  },
  {
    _id: 'mock_app_5',
    name: '',
    username: 'cipher_spider',
    email: '',
    state: 'Tamil Nadu',
    occupation: 'Database Architect',
    skills: ['Data Mining', 'SQL/NoSQL', 'System Security'],
    whyJoin: 'To enforce transparency. Nation first, politics next.',
    anonymousMode: true,
    status: 'Rejected',
    createdAt: new Date('2026-05-14T11:05:00Z')
  },
  {
    _id: 'mock_app_6',
    name: 'Kabir Mehta',
    username: 'kabir_factcheck',
    email: 'kabir.mehta@mrd.net',
    state: 'Gujarat',
    occupation: 'Fact Checker',
    skills: ['OSINT', 'Data Analysis', 'Writing'],
    whyJoin: 'Dal needs disciplined fact check streams. Ready to contribute.',
    anonymousMode: false,
    status: 'Approved',
    createdAt: new Date('2026-05-16T18:00:00Z')
  }
];

// Submit Applicant Onboarding Form (Auto-approved)
const submitApplicant = async (req, res) => {
  try {
    const { name, username, email, state, occupation, skills, whyJoin, anonymousMode } = req.body;

    // Custom Validation
    if (!username || !state || !occupation || !whyJoin) {
      return res.status(400).json({ error: 'Please fulfill all compulsory onboarding fields.' });
    }

    if (!anonymousMode && (!name || !email)) {
      return res.status(400).json({ error: 'Public mode requires Full Name and Valid Email Address.' });
    }

    const processedSkills = Array.isArray(skills) 
      ? skills 
      : skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : [];

    const newApplicantData = {
      name: anonymousMode ? '' : name,
      username,
      email: anonymousMode ? '' : email,
      state,
      occupation,
      skills: processedSkills,
      whyJoin,
      anonymousMode: !!anonymousMode,
      status: 'Approved',
      createdAt: new Date()
    };

    if (getDbMode()) {
      // Offline store submit
      const mockId = `mock_app_${Date.now()}`;
      const createdMock = { _id: mockId, ...newApplicantData };
      mockApplicants.unshift(createdMock);
      return res.status(201).json({
        message: 'Onboarding completed. Your profile has been registered in the active cohort.',
        applicant: createdMock
      });
    }

    // Mongoose Save
    const newApplicant = new Applicant(newApplicantData);
    await newApplicant.save();

    res.status(201).json({
      message: 'Onboarding completed. Your profile has been registered in the active cohort.',
      applicant: newApplicant
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to complete registration onboarding.' });
  }
};

// Retrieve Applicants (with filters, pagination, search)
const getApplicants = async (req, res) => {
  try {
    const { state, status, search } = req.query;

    if (getDbMode()) {
      let filtered = [...mockApplicants];

      // Filters
      if (state) {
        filtered = filtered.filter(a => a.state.toLowerCase() === state.toLowerCase());
      }
      if (status) {
        filtered = filtered.filter(a => a.status.toLowerCase() === status.toLowerCase());
      }
      if (search) {
        const query = search.toLowerCase();
        filtered = filtered.filter(a => 
          (a.name && a.name.toLowerCase().includes(query)) ||
          a.username.toLowerCase().includes(query) ||
          a.occupation.toLowerCase().includes(query) ||
          a.whyJoin.toLowerCase().includes(query)
        );
      }

      // Sort by newest
      filtered.sort((a, b) => b.createdAt - a.createdAt);

      return res.json({
        applicants: filtered,
        total: filtered.length
      });
    }

    // Mongoose query
    let query = {};
    if (state) query.state = state;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { username: { $regex: search, $options: 'i' } },
        { occupation: { $regex: search, $options: 'i' } },
        { whyJoin: { $regex: search, $options: 'i' } }
      ];
    }

    const applicants = await Applicant.find(query).sort({ createdAt: -1 });
    const total = await Applicant.countDocuments(query);

    res.json({ applicants, total });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Search command execution error in applicant database.' });
  }
};

// Approve/Reject Onboarding Status
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
      return res.status(400).json({ error: 'Invalid security status classification.' });
    }

    if (getDbMode()) {
      const idx = mockApplicants.findIndex(a => a._id === id);
      if (idx === -1) {
        return res.status(404).json({ error: 'Candidate profile record not found.' });
      }

      mockApplicants[idx].status = status;
      return res.json({
        message: `Candidate onboarding status modified to ${status}`,
        applicant: mockApplicants[idx]
      });
    }

    const applicant = await Applicant.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!applicant) {
      return res.status(404).json({ error: 'Candidate profile record not found.' });
    }

    res.json({
      message: `Candidate onboarding status modified to ${status}`,
      applicant
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Security clearance modification process failed.' });
  }
};

// Export Applicants to CSV
const exportCSV = async (req, res) => {
  try {
    let list = [];

    if (getDbMode()) {
      list = [...mockApplicants];
    } else {
      list = await Applicant.find({}).sort({ createdAt: -1 });
    }

    // Generate CSV contents
    let csvContent = 'ID,Username,Name,Email,State,Occupation,Skills,AnonymousMode,Status,CreatedAt\n';
    list.forEach(a => {
      const escapedName = (a.name || '').replace(/"/g, '""');
      const escapedWhy = (a.whyJoin || '').replace(/"/g, '""');
      const escapedSkills = (a.skills || []).join('; ').replace(/"/g, '""');
      
      csvContent += `"${a._id}","${a.username}","${escapedName}","${a.email || ''}","${a.state}","${a.occupation}","${escapedSkills}","${a.anonymousMode}","${a.status}","${a.createdAt.toISOString()}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=mrd_applicants_command_export.csv');
    res.status(200).send(csvContent);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Command console failed to compile database CSV export.' });
  }
};

// Retrieve Approved Cohort Members Count (Public)
const getApprovedCount = async (req, res) => {
  try {
    if (getDbMode()) {
      const count = mockApplicants.filter(a => a.status === 'Approved').length;
      return res.json({ count });
    }
    const count = await Applicant.countDocuments({ status: 'Approved' });
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve cohort count.' });
  }
};

module.exports = { submitApplicant, getApplicants, getApprovedCount, updateStatus, exportCSV, mockApplicants };
