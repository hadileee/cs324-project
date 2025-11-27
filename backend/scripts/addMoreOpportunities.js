const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const User = require('../models/User');
const Opportunity = require('../models/Opportunity');

async function run() {
  try {
    await connectDB();

    // Try to find existing company and university users
    let company = await User.findOne({ role: 'company' });
    let university = await User.findOne({ role: 'university' });

    if (!company) {
      company = await User.create({
        firstName: 'Auto',
        lastName: 'Company',
        email: 'auto-company@example.com',
        password: 'Password1',
        role: 'company',
        companyName: 'Auto Company',
        industry: 'Technology'
      });
      console.log('Created auto company', company.email);
    }

    if (!university) {
      university = await User.create({
        firstName: 'Auto',
        lastName: 'University',
        email: 'auto-university@example.com',
        password: 'Password1',
        role: 'university',
        universityName: 'Auto University',
        website: 'https://auto-university.example'
      });
      console.log('Created auto university', university.email);
    }

    const more = [
      {
        title: 'Data Science Internship - Tunis',
        description: 'Work on real data science problems with our analytics team.',
        type: 'internship',
        postedBy: company._id,
        postedByRole: 'company',
        location: 'Tunis, Tunisia',
        salary: 600,
        salaryType: 'stipend',
        duration: '3 months',
        requirements: ['Python', 'Pandas', 'SQL'],
        skills: ['Data Analysis', 'Python']
      },
      {
        title: 'UX Research Assistant',
        description: 'Assist in qualitative and quantitative UX studies.',
        type: 'research',
        postedBy: university._id,
        postedByRole: 'university',
        location: 'Remote',
        salary: 0,
        salaryType: 'stipend',
        duration: '4 months',
        requirements: ['Research methods', 'Surveys'],
        skills: ['User Research']
      },
      {
        title: 'Backend Engineering Intern',
        description: 'Build scalable backend services using Node.js and MongoDB.',
        type: 'internship',
        postedBy: company._id,
        postedByRole: 'company',
        location: 'Sfax, Tunisia',
        salary: 700,
        salaryType: 'stipend',
        duration: '6 months',
        requirements: ['Node.js', 'Express'],
        skills: ['Node.js', 'Databases']
      },
      {
        title: 'Full Stack Graduate Role',
        description: 'Join as a full stack developer working across React and Node.js.',
        type: 'graduate_job',
        postedBy: company._id,
        postedByRole: 'company',
        location: 'Tunis, Tunisia',
        salary: 20000,
        salaryType: 'annual',
        duration: 'Permanent',
        requirements: ['React', 'Node.js'],
        skills: ['Fullstack']
      },
      {
        title: 'AI Ethics Researcher',
        description: 'Investigate ethical implications of AI systems.',
        type: 'research',
        postedBy: university._id,
        postedByRole: 'university',
        location: 'Tunis, Tunisia',
        salary: 0,
        salaryType: 'stipend',
        duration: '12 months',
        requirements: ['Philosophy/CS background'],
        skills: ['Research']
      }
    ];

    // Insert but avoid duplicates by title
    for (const item of more) {
      const exists = await Opportunity.findOne({ title: item.title });
      if (!exists) {
        await Opportunity.create(item);
        console.log('Inserted opportunity:', item.title);
      } else {
        console.log('Skipping existing:', item.title);
      }
    }

    await mongoose.connection.close();
    console.log('Done.');
    process.exit(0);
  } catch (err) {
    console.error('Error adding opportunities:', err);
    process.exit(1);
  }
}

run();
