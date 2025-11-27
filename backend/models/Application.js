const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    opportunity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Opportunity',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'accepted', 'rejected', 'withdrawn'],
      default: 'pending',
    },
    coverLetter: String,
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    reviewedAt: Date,
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    feedback: String,
  },
  { timestamps: true }
);

// Ensure one application per student per opportunity
applicationSchema.index({ student: 1, opportunity: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
