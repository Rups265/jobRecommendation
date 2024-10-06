const log = require("../configs/logger.config");
const jobDao = require("../daos/job.dao");
const jobCategoryDao = require("../daos/jobCategory.dao");
const { titleCase } = require("../utils/helpers/common.utils");

class JobService {
  async addJobCategoryService(req, res) {
    try {
      const adminId = req.userId;
      console.log("sssssssss",req);
      const { name } = req.body;
      console.log("ssssssssssss",req.body,adminId);
      if (!adminId || !name) {
        return res.status(400).json({
          message: "something went wrong",
          status: "fail",
          code: 201,
          data: null,
        });
      }

      const isCatNameExist = await jobCategoryDao.getJobCategoryName(name);
      if (isCatNameExist.data) {
        return res.status(201).json({
          message: "job category name already exist",
          status: "fail",
          code: 201,
        });
      }

      const data = {
        name: titleCase(name),
      };

      const result = await jobCategoryDao.addJobCategory(data);

      if (result.data) {
        return res.status(200).json({
          message: "job category created successfully",
          status: "success",
          code: 200,
          data: result.data,
        });
      } else {
        return res.status(201).json({
          message: "job category creation failed",
          status: "failed",
          code: 201,
          data: null,
        });
      }
    } catch (error) {
      log.error("error from [ADD JOB CATEGORY SERVICE]: ", error);
      throw error;
    }
  }

  async getJobCategoryByIdService(req, res) {
    try {
      const { jobCategoryId } = req.body;

      if (!jobCategoryId) {
        return res.status(200).json({
          message: "something went wrong",
          status: "fail",
          code: 200,
          data: null,
        });
      }

      const isExist = await jobCategoryDao.getJobCategoryById(jobCategoryId);
      if (!isExist.data) {
        return res.status(200).json({
          message: "job category not found",
          status: "fail",
          code: 200,
          data: null,
        });
      } else {
        return res.status(200).json({
          message: "job category retrieved successfully",
          status: "success",
          code: 200,
          data: result.data,
        });
      }
    } catch (error) {
      log.error("error from [JOB CATEGORY SERVICE]: ", error);
      throw error;
    }
  }

  async getAllJobCategoryService(req, res) {
    try {
      const result = await jobCategoryDao.getAllJobCategory();
      if (result.data) {
        return res.status(200).json({
          message: "job categories retrieved successfully",
          status: "success",
          code: 200,
          data: result.data,
        });
      } else {
        return res.status(201).json({
          message: "job category retrieved failed",
          status: "failed",
          code: 201,
          data: null,
        });
      }
    } catch (error) {
      log.error("error from [ADD ADMIN SERVICE]: ", error);
      throw error;
    }
  }

  async updateJobCategoryByIdService(req, res) {
    try {
      const adminId = req.userId;
      const { jobCategoryId, name, isActive,} = req.body;
      if (!adminId || !jobCategoryId) {
        return res.status(400).json({
          message: "something went wrong",
          status: "fail",
          code: 201,
          data: null,
        });
      }

      const isCatExist = await jobCategoryDao.getJobCategoryById(jobCategoryId);
      if (!isCatExist.data) {
        return res.status(400).json({
          message: "job category not found",
          status: "fail",
          code: 201,
          data: null,
        });
      }
      const data = {
        name,
        isActive,
      };
      const result = await jobCategoryDao.updateJobCategory(
        jobCategoryId,
        data
      );

      if (result.data) {
        return res.status(200).json({
          message: "job category updated successfully",
          status: "success",
          code: 200,
          data: result.data,
        });
      } else {
        return res.status(201).json({
          message: "job category update failed",
          status: "failed",
          code: 201,
          data: null,
        });
      }
    } catch (error) {
      log.error("error from [JOB CATEGORY SERVICE]: ", error);
      throw error;
    }
  }

  async deleteJobCategoryByIdService(req, res) {
    try {
      const { jobCategoryId } = req.body;
      const adminId = req.userId;

      const isExist = await jobCategoryDao.getJobCategoryById(jobCategoryId);
      if (!isExist.data) {
        return res.status(400).json({
          message: "job category not found",
          status: "fail",
          code: 201,
          data: null,
        });
      }

      const result = await jobCategoryDao.deleteJobCategory(jobCategoryId);
      if (result.data) {
        return res.status(200).json({
          message: "job category deleted successfully",
          status: "success",
          code: 200,
          data: result.data,
        });
      } else {
        return res.status(201).json({
          message: "job category delete failed",
          status: "failed",
          code: 201,
          data: null,
        });
      }
    } catch (error) {
      log.error("error from [JOB CATEGORY SERVICE]: ", error);
      throw error;
    }
  }
}
module.exports = new JobService();
