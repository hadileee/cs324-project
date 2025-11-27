const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const User = require('../models/User');
const Opportunity = require('../models/Opportunity');

const seed = async () => {
  try {
    await connectDB();

    // Ensure seed users exist (university and company)
  const uniEmail = 'seed-university@example.com';
  const compEmail = 'seed-company@example.com';

    let university = await User.findOne({ email: uniEmail });
    if (!university) {
      university = await User.create({
        firstName: 'Seed',
        lastName: 'University',
        email: uniEmail,
        password: 'Password1',
        role: 'university',
        universityName: 'Seed University',
        website: 'https://seed-university.example',
      });
      console.log('Created seed university user:', university.email);
    }

    let company = await User.findOne({ email: compEmail });
    if (!company) {
      company = await User.create({
        firstName: 'Seed',
        lastName: 'Company',
        email: compEmail,
        password: 'Password1',
        role: 'company',
        companyName: 'Seed Company',
        industry: 'Technology',
        website: 'https://seed-company.example',
      });
      console.log('Created seed company user:', company.email);
    }

    const count = await Opportunity.countDocuments();
    if (count > 0) {
      console.log(`Opportunities already present (${count}), skipping seed insert.`);
      await mongoose.connection.close();
      process.exit(0);
    }

    const sampleOpportunities = [
      {
        title: 'Machine Learning Research Assistant',
        description: 'Work on state-of-the-art ML research with Seed University. Ideal for students with ML background.',
        type: 'research',
        postedBy: university._id,
        postedByRole: 'university',
  location: 'Remote',
  salary: 0,
  salaryType: 'stipend',
  duration: '6 months',
        requirements: ['Python', 'TensorFlow', 'Linear Algebra'],
        qualifications: ['Undergraduate or Master student'],
        skills: ['Machine Learning', 'Python'],
        applicationDeadline: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      },
      {
        title: 'Frontend Engineering Intern',
        description: 'Join Seed Company to build delightful user experiences in React.',
        type: 'internship',
        postedBy: company._id,
        postedByRole: 'company',
        location: 'Tunis, Tunisia',
  salary: 800,
  salaryType: 'stipend',
        duration: '3 months',
        requirements: ['React', 'HTML', 'CSS', 'JavaScript'],
        qualifications: ['Currently enrolled student'],
        skills: ['React', 'JavaScript'],
        applicationDeadline: new Date(new Date().setDate(new Date().getDate() + 30)),
      },
      {
        title: 'Graduate Software Engineer',
        description: 'Full-time role for recent graduates to join Seed Company engineering team.',
        type: 'graduate_job',
        postedBy: company._id,
        postedByRole: 'company',
        location: 'Tunis, Tunisia',
        salary: 25000,
        salaryType: 'annual',
        duration: 'Permanent',
        requirements: ['Data Structures', 'Algorithms', 'Node.js'],
        qualifications: ['BSc or MSc in CS or related field'],
        skills: ['Node.js', 'Databases'],
        applicationDeadline: new Date(new Date().setMonth(new Date().getMonth() + 2)),
      },
    ];

    await Opportunity.insertMany(sampleOpportunities);
    console.log('Inserted sample opportunities.');

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();
