const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      unique: true,
      required: true,
    },
    jobCategoryId: {
      type: String,
      required: true,
      ref: "JobCategory",
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    requiredSkills: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    jobType: {
      type: String,
      enum: [
        "remote",
        "fullTime",
        "partTime",
        "contract",
        "temporary",
        "internship",
      ],
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ["entryLevel", "midLevel", "seniorLevel"],
      required: true,
    },
    applicationDeadline: {
      type: Date,
      required: true,
    },
    postedDate: {
      type: Date,
      default: Date.now,
      required: false,
    },
    benefits: {
      type: [String],
      default: [],
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    educationRequired: {
      type: String,
      required: true,
    },
    numberOfOpenings: {
      type: Number,
      default: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
