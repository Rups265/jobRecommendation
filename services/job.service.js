const log = require("../configs/logger.config");
const jobDao = require("../daos/job.dao");
const jobCategoryDao = require("../daos/jobCategory.dao");
const userDao = require("../daos/user.dao");
const {
  validateEmail,
  validateIndianMobileNumber,
  validateUSAMobileNumber,
} = require("../utils/helpers/validator.utils");

class JobService {
  async addJobService(req, res) {
    try {
      const {
        jobCategoryId,
        jobTitle,
        company,
        location,
        salary,
        requiredSkills,
        jobType,
        experienceLevel,
        applicationDeadline,
        educationRequired,
        numberOfOpenings,
        benefits,
        responsibilities,
      } = req.body;
      console.log(req.body);
      if (
        !jobCategoryId ||
        !jobTitle ||
        !company ||
        !location ||
        !salary ||
        !requiredSkills ||
        !jobType ||
        !experienceLevel ||
        !applicationDeadline ||
        !educationRequired ||
        !numberOfOpenings ||
        !benefits ||
        !responsibilities
      ) {
        return res.status(201).json({
          message: "something went wrong",
          status: "fail",
          code: 200,
          data: null,
        });
      }

      const data = {
        jobCategoryId,
        jobTitle,
        company,
        location,
        salary,
        requiredSkills,
        jobType,
        experienceLevel,
        applicationDeadline,
        educationRequired,
        numberOfOpenings,
        benefits,
        responsibilities,
        postedDate: Date.now(),
      };

      const result = await jobDao.addJob(data);
      if (result.data) {
        return res.status(200).json({
          message: "job created successfully",
          status: "success",
          code: 200,
          data: result.data,
        });
      } else {
        return res.status(201).json({
          message: "job creation failed",
          status: "failed",
          code: 201,
          data: null,
        });
      }
    } catch (error) {
      log.error("error from [JOB SERVICE]: ", error);
      throw error;
    }
  }

  async getJobByIdService(req, res) {
    try {
      const { jobId } = req.body;

      if (!jobId) {
        return res.status(400).json({
          message: "something went wrong",
          status: "fail",
          code: 201,
          data: null,
        });
      }
      const isJobExist = await jobDao.getJobById(jobId);
      if (!isJobExist.data) {
        return res.status(400).json({
          message: "job not found",
          status: "fail",
          code: 201,
          data: null,
        });
      }

      const result = await jobDao.getJobById(jobId);
      if (result.data) {
        return res.status(200).json({
          message: "job get successfully",
          status: "success",
          code: 200,
          data: result.data,
        });
      } else {
        return res.status(201).json({
          message: "job not found",
          status: "failed",
          code: 201,
          data: null,
        });
      }
    } catch (error) {
      log.error("error from [JOB SERVICE]: ", error);
      throw error;
    }
  }

  async getAllJobService(req, res) {
    try {
      const result = await jobDao.getAllJob();
      if (result.data) {
        return res.status(200).json({
          message: "job get successfully",
          status: "success",
          code: 200,
          data: result.data,
        });
      } else {
        return res.status(201).json({
          message: "job not found failed",
          status: "failed",
          code: 201,
          data: null,
        });
      }
    } catch (error) {
      log.error("error from [JOB SERVICE]: ", error);
      throw error;
    }
  }

  async updateJobByIdService(req, res) {
    try {
      const {
        jobId,
        jobCategoryId,
        jobTitle,
        company,
        location,
        salary,
        requiredSkills,
        jobType,
        experienceLevel,
        applicationDeadline,
        educationRequired,
        numberOfOpenings,
        benefits,
        responsibilities,
        isActive,
      } = req.body;
      console.log(req.body);
      if (!jobId) {
        return res.status(201).json({
          message: "something went wrong",
          status: "fail",
          code: 200,
          data: null,
        });
      }

      if (jobCategoryId) {
        const isExist = await jobCategoryDao.getJobCategoryById(jobCategoryId);
        if (!isExist.data) {
          return res.status(200).json({
            message: "job category not found",
            status: "fail",
            code: 200,
            data: null,
          });
        }
      }

      const isExist = await jobDao.getJobById(jobId);
      if (!isExist.data) {
        return res.status(200).json({
          message: "job not found",
          status: "fail",
          code: 201,
          data: null,
        });
      }

      const data = {
        jobCategoryId,
        jobTitle,
        company,
        location,
        salary,
        requiredSkills,
        jobType,
        experienceLevel,
        applicationDeadline,
        educationRequired,
        numberOfOpenings,
        benefits,
        responsibilities,
        isActive,
      };

      const result = await jobDao.updateJobById(jobId, data);
      if (result.data) {
        return res.status(200).json({
          message: "job created successfully",
          status: "success",
          code: 200,
          data: result.data,
        });
      } else {
        return res.status(201).json({
          message: "job creation failed",
          status: "failed",
          code: 201,
          data: null,
        });
      }
    } catch (error) {
      log.error("error from [JOB SERVICE]: ", error);
      throw error;
    }
  }

  async deleteJobByIdService(req, res) {
    try {
      const adminId = req.userId;
      const { jobId } = req.body;
      if (!adminId || !jobId) {
        return res.status(400).json({
          message: "something went wrong",
          status: "fail",
          code: 201,
          data: null,
        });
      }
      const isExist = await jobDao.getJobById(jobId);
      if (!isExist.data) {
        return res.status(400).json({
          message: "job not found",
          status: "fail",
          code: 201,
          data: null,
        });
      }

      const result = await jobDao.deleteJobById(jobId);
      if (result.data) {
        return res.status(200).json({
          message: "job deleted successfully",
          status: "success",
          code: 200,
        });
      } else {
        return res.status(201).json({
          message: "job deletion failed",
          status: "failed",
          code: 201,
        });
      }
    } catch (error) {
      log.error("error from [JOB SERVICE]: ", error);
      throw error;
    }
  }

  async getJobDetailsService(req, res) {
    try {
      const {
        jobId,
        name,
        location,
        jobType,
        employmentType,
        experienceLevel,
        jobCategoryId,
        keyWord,
        page = 1,
        limit = 9,
        sort,
        lastDate,
      } = req.body;
      console.log(req.body);
      console.log(req.body.jobId);

      const result = await jobDao.getAllJobForUser(
        jobId,
        name,
        location,
        jobType,
        employmentType,
        experienceLevel,
        jobCategoryId,
        keyWord,
        lastDate,
        page,
        limit,
        sort
      );
      if (result.data) {
        return res.status(200).json({
          message: "job get successfully",
          success: "success",
          code: 200,
          data: result.data,
        });
      } else {
        return res.status(201).json({
          message: "job not found",
          success: "failed",
          code: 201,
          data: null,
        });
      }
    } catch (error) {
      log.error("error from [JOB SERVICE]: ", error);
      throw error;
    }
  }

  //getAllJobCategoryService
  async getAllJobCategoryService(req, res) {
    try {
      const result = await jobCategoryDao.getAllJobCategory();
      if (result.data) {
        return res.status(200).json({
          message: "job categories get successfully",
          status: "success",
          code: 200,
          data: result.data,
        });
      } else {
        return res.status(201).json({
          message: "job categories not found",
          status: "failed",
          code: 201,
          data: null,
        });
      }
    } catch (error) {
      log.error("error from [JOB SERVICE]: ", error);
      throw error;
    }
  }

  //applyForJobService
  async applyForJobService(req, res) {
    try {
      const {
        jobId,
        firstName,
        lastName,
        email,
        phoneNumber,
        authorizedTOWorkInUS,
        visaSponsorship,
        Referrer,
        receiveCommunication,
      } = req.body;
      console.log(req.body);
      if (
        !jobId ||
        !firstName ||
        !lastName ||
        !email ||
        !phoneNumber ||
        !authorizedTOWorkInUS ||
        !visaSponsorship ||
        !receiveCommunication
      ) {
        return res.status(400).json({
          message: "something went wrong",
          success: "fail",
          code: 201,
          data: null,
        });
      }

      if (!req.files.resume || !req.files.resume[0].location) {
        return res.status(400).json({
          message: "Resume is required",
          status: "fail",
          code: 201,
          data: null,
        });
      }

      const resumeLocation = req.files.resume[0].location;
      const coverLetterLocation = req.files.coverLetter
        ? req.files.coverLetter[0].location
        : null;

      console.log("Resume Location:", resumeLocation);
      console.log("Cover Letter Location:", coverLetterLocation);
      if (!validateEmail(email)) {
        return res.status(201).json({
          message: "please enter valid email",
          code: 201,
          status: "fail",
        });
      }

      const isExist = await jobDao.getJobById(jobId);
      if (!isExist.data) {
        return res.status(400).json({
          message: "job not found",
          success: "fail",
          code: 201,
          data: null,
        });
      }

      const applyDate = Date.now();
      const deadLine = isExist.data.applicationDeadline;

      if (deadLine - applyDate < 0) {
        return res.status(201).json({
          message: "this job has been closed",
          status: "fail",
          code: 201,
        });
      }

      if (!validateUSAMobileNumber(phoneNumber)) {
        return res.status(201).json({
          message: "please enter valid phoneNumber",
          code: 201,
          status: "fail",
        });
      }

      const isRegisteredForJobId = await applicantDao.getJobByEmailAndJobId(
        jobId,
        email
      );
      if (isRegisteredForJobId.data) {
        return res.status(201).json({
          message: "you have already registered for this role",
          success: "fail",
          code: 201,
          data: null,
        });
      }

      const data = {
        jobId,
        firstName,
        lastName,
        email,
        phoneNumber,
        authorizedTOWorkInUS,
        visaSponsorship,
        Referrer,
        receiveCommunication,
        resume: req.files.resume[0].location,
        coverLetter: coverLetterLocation,
      };

      const result = await applicantDao.applyJob(data);
      if (result.data) {
        const emailData = {
          email,
        };
        await sendMail({
          email: email,
          subject: "We have received your application Thank You !!!",
          emailData,
          emailType: "job",
        });
        return res.status(200).json({
          message:
            "Thank you for your interest. You will be receiving a confirmation mail from our side",
          success: "success",
          code: 200,
        });
      } else {
        return res.status(201).json({
          message: "error while applying please try again",
          success: "failed",
          code: 201,
        });
      }
    } catch (error) {
      log.error("error from [JOB SERVICE]: ", error);
      throw error;
    }
  }

  //recommendedJobService
  async recommendedJobService(req, res) {
    try {
      const userId = req.userId;
      console.log("Sssssssss",userId);
      if (!userId) {
        return res.status(201).json({
          message: "something went wrong",
          status: "fail",
          code: 201,
          data: null,
        });
      }

      const user = await userDao.getUserById(userId);
      if (!user.data) {
        return res.status(201).json({
          message: "user not found",
          status: "fail",
          code: 201,
          data: null,
        });
      }
      const result = await jobDao.getRecommendedJobForUser(userId);
      if (result.data) {
        return res.status(200).json({
          message: "recommended get successfully",
          status: "success",
          code: 200,
          data: result.data,
        });
      } else {
        return res.status(201).json({
          message: "recommended job not found",
          status: "failed",
          code: 201,
          data: [],
        });
      }
    } catch (error) {
      log.error("error from [JOB SERVICE]: ", error);
      throw error;
    }
  }
}
module.exports = new JobService();
