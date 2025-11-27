const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    type: {
      type: String,
      enum: ['internship', 'research', 'graduate_job', 'part_time'],
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    postedByRole: {
      type: String,
      enum: ['university', 'company'],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      default: null,
    },
    salaryType: {
      type: String,
      enum: ['hourly', 'annual', 'stipend'],
      default: null,
    },
    duration: String, // e.g., "3 months", "Summer 2024"
    requirements: [String],
    qualifications: [String],
    skills: [String],
    applicationDeadline: Date,
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['open', 'closed', 'filled'],
      default: 'open',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Opportunity', opportunitySchema);
