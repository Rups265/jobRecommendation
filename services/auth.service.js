const log = require("../configs/logger.config");
const userDao = require("../daos/user.dao");
const { createToken } = require("../utils/helpers/token.utils");
const { hashItem, compareItems } = require("../utils/helpers/bcrypt.utils");
const {
  validateEmail,
  validateMobileNumber,
  titleCase,
} = require("../utils/helpers/validator.utils");
const {
  removeNullUndefined,
  generateOTP,
  randomString,
} = require("../utils/helpers/common.utils");
const { sanitizedUserData } = require("../utils/helpers/sanitized.util");
class UserService {
  async signUpService(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        contact,
        skills,
        experienceLevel,
        preferences,
        locations,
        jobType,
        resumeUrl,
        education,
        experience,
        certifications,
        portfolioUrl,
        linkedinUrl,
        githubUrl,
        coverLetter,
      } = req.body;
      if (!firstName || !lastName || !email || !password || !contact) {
        log.error("Error from [AUTH SERVICES]: please enter all fields");
        return res.status(400).json({
          message: "please enter all fields",
          status: "failed",
          data: null,
          code: 201,
        });
      }
      if (!validateEmail(email)) {
        return res.status(201).json({
          message: "please enter valid email",
          code: 201,
          status: "fail",
        });
      }
      if (!validateMobileNumber(contact)) {
        return res.status(400).json({
          message: "please enter valid phoneNumber",
          status: "fail",
          code: 201,
        });
      }
      const isExist = await userDao.getUserByEmail(email);
      if (isExist.data) {
        return res.status(201).json({
          message: "email already exist",
          status: "fail",
          code: 201,
          data: null,
        });
      }

      const isExistNumber = await userDao.getUserByContact(contact);
      if (isExistNumber.data) {
        return res.status(201).json({
          message: "phone number already exist",
          status: "fail",
          code: 201,
          data: null,
        });
      }

      const data = {
        firstName: titleCase(firstName),
        lastName: titleCase(lastName),
        email: email.toLowerCase(),
        contact,
        password: await hashItem(password),
        skills,
        experienceLevel,
        preferences,
        locations,
        jobType,
        resumeUrl,
        education,
        experience,
        certifications,
        portfolioUrl,
        linkedinUrl,
        githubUrl,
        coverLetter,
        role: "User",
      };

      const user = await userDao.createUser(data);

      const token = await createToken(user.data.userId, "user");
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "User created successfully",
        data: await sanitizedUserData(user.data),
        token: token,
      });
    } catch (error) {
      log.error("error from [AUTH SERVICE]: ", error);
      throw error;
    }
  }

  //login
  async loginService(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        log.error("Error from [AUTH SERVICES]: please enter all fields");
        return res.status(400).json({
          message: "Invalid request",
          status: "failed",
          data: null,
          code: 201,
        });
      }

      if (!validateEmail(email)) {
        return res.status(201).json({
          message: "please enter valid email",
          code: 201,
          status: "fail",
        });
      }
      const isEmailExist = await userDao.getUserByEmail(email);
      if (!isEmailExist.data) {
        return res.status(404).json({
          message: "email not exist",
          status: "fail",
          code: 201,
        });
      }

      const response = await compareItems(
        password.trim(),
        isEmailExist.data.password
      );
      if (!response) {
        return res.status(201).json({
          message: "please enter valid password",
          status: "incorrectPassword",
          code: 201,
          data: null,
        });
      }

      let token = null;
      if (isEmailExist.data.role === "Admin") {
        console.log("this is admin");
        token = await createToken(isEmailExist.data.userId, "Admin");
      } else {
        token = await createToken(isEmailExist.data.userId, "user");
      }

      return res.status(200).json({
        message: "user login successfully",
        status: "success",
        code: 200,
        data: await sanitizedUserData(isEmailExist.data),
        token: token,
      });
    } catch (error) {
      log.error("error from [AUTH SERVICE]: ", error);
      throw error;
    }
  }

  //editProfileService
  async editProfileService(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        currPassword,
        newPassword,
        confirmNewPassword,
        contact,
        skills,
        experienceLevel,
        preferences,
        locations,
        jobType,
        resumeUrl,
        education,
        experience,
        certifications,
        portfolioUrl,
        linkedinUrl,
        githubUrl,
        coverLetter,
      } = req.body;
      const userId = req.userId;

      console.log("ddddddddddddddd", req.body);
      if (!userId) {
        log.error("Error from [User SERVICE]: All Fields Are Mandatory");
        return res.status(400).json({
          message: "please enter all fields",
          code: 201,
          status: "fail",
        });
      }

      if (contact) {
        if (!validateMobileNumber(contact)) {
          return res.status(400).json({
            message: "please enter valid phoneNumber",
            status: "fail",
            code: 201,
          });
        }
      }

      const result = await userDao.getUserById(userId);
      if (!result.data) {
        return res.status(400).json({
          message: "user not found",
          success: "fail",
          code: 201,
        });
      }

      console.log("result", result.data);

      let updatedPassword;
      if (currPassword) {
        const ans = await compareItems(currPassword, result.data.password);
        if (!ans) {
          return res.status(201).json({
            message: "please enter valid current password",
            success: "fail",
            code: 201,
          });
        }

        if (newPassword !== confirmNewPassword) {
          log.error(
            "Error from [User SERVICE]: new password or confirm Password not match"
          );
          return res.status(400).json({
            message: "new password or confirm Password not match",
            code: 201,
            status: "fail",
          });
        }
        updatedPassword = await hashItem(newPassword);
      }

      let data = {
        firstName,
        lastName,
        email,
        currPassword,
        newPassword,
        confirmNewPassword,
        contact,
        skills,
        experienceLevel,
        preferences,
        locations,
        jobType,
        resumeUrl,
        education,
        experience,
        certifications,
        portfolioUrl,
        linkedinUrl,
        githubUrl,
        coverLetter,
      };

      if (newPassword) {
        data.password = updatedPassword;
      }

      const updatedData = removeNullUndefined(data);
      console.log("...................", updatedData);
      const updatedUser = await userDao.updateUser(userId, updatedData);
      console.log(updatedUser);
      const newData = await sanitizedUserData(updatedUser.data);
      console.log("cccccccccccccccccccccccc", newData);
      return res.status(200).json({
        message: "user profile updated successfully",
        status: "success",
        code: 200,
        data: newData,
      });
    } catch (error) {
      log.error("error from [AUTH SERVICE]: ", error);
      throw error;
    }
  }
  //getUserDetailService
  async getUserDetailService(req, res) {
    try {
      const userId = req.userId;
      if (!userId) {
        log.error("Error from [User SERVICE]: All Fields Are Mandatory");
        return res.status(400).json({
          message: "something went wrong",
          code: 201,
          status: "fail",
        });
      }
      const result = await userDao.getUser(userId);
      console.log("sssssssssss", result);
      if (result.data) {
        return res.status(200).json({
          message: "user get successfully",
          success: "success",
          code: 200,
          data: await sanitizedUserData(result.data),
        });
      } else {
        return res.status(201).json({
          message: "user not found",
          success: "fail",
          code: 201,
          data: null,
        });
      }
    } catch (error) {
      log.error("error from [AUTH SERVICE]: ", error);
      throw error;
    }
  }
}
module.exports = new UserService();
