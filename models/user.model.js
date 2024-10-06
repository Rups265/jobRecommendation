const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      required:  true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      trim: true,
      required: false,
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    experienceLevel: {
      type: String,
      trim: true,
      enum: ["EntryLevel", "MidLevel", "SeniorLevel", "Internship", "Fresher"],
    },
    preferences: {
      desiredRoles: [
        {
          type: String,
          trim: true,
        },
      ],
      desiredJobTypes: [
        {
          type: String,
          enum: ["FullTime", "PartTime", "Internship", "Contract"],
          trim: true,
        },
      ],
      preferredLocations: [
        {
          type: String,
          trim: true,
        },
      ],
      expectedSalaryRange: {
        min: {
          type: Number,
          required: false,
        },
        max: {
          type: Number,
          required: false,
        },
      },
    },
    locations: {
      type: [
        {
          type: String,
          trim: true,
        },
      ],
    },
    jobType: {
      type: String,
      enum: ["FullTime", "PartTime", "Internship", "Contract"],
      trim: true,
      required: false,
    },
    resumeUrl: {
      type: String,
      trim: true,
    },
    education: [
      {
        degree: {
          type: String,
          required: false,
          trim: true,
        },
        institution: {
          type: String,
          required: false,
          trim: true,
        },
        fieldOfStudy: {
          type: String,
          required: false,
          trim: true,
        },
        startDate: {
          type: Date,
          required: false,
        },
        endDate: {
          type: Date,
          required: false,
        },
        grade: {
          type: String,
          required: false,
          trim: true,
        },
      },
    ],
    experience: [
      {
        jobTitle: {
          type: String,
          required: false,
          trim: true,
        },
        company: {
          type: String,
          required: false,
          trim: true,
        },
        startDate: {
          type: Date,
          required: false,
        },
        endDate: {
          type: Date,
          required: false,
        },
        description: {
          type: String,
          required: false,
          trim: true,
        },
      },
    ],
    certifications: [
      {
        certificationName: {
          type: String,
          required: false,
          trim: true,
        },
        institution: {
          type: String,
          required:false,
          trim: true,
        },
        credentialUrl: {
          type: String,
          required: false,
          trim: true,
        },
      },
    ],
    portfolioUrl: {
      type: String,
      trim: true,
      required: false,
    },
    linkedinUrl: {
      type: String,
      trim: true,
      required: false,
    },
    githubUrl: {
      type: String,
      trim: true,
      required: false,
    },
    coverLetter: {
      type: String,
      trim: true,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
