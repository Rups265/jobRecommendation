const log = require("../configs/logger.config");
const userModel = require("../models/user.model");
const getNextSequenceValue = require("../utils/helpers/counter.utils");
const { hashItem } = require("../utils/helpers/bcrypt.utils");

class UserDao {
  async getUserById(userId) {
    try {
      console.log("Ssssssssssss", userId);
      const user = await userModel.findOne({ userId: userId });
      if (!user) {
        return {
          message: "user not found",
          status: "fail",
          code: 201,
          data: null,
        };
      } else {
        return {
          message: "user found",
          status: "success",
          code: 200,
          data: user,
        };
      }
    } catch (error) {
      log.error("Error from [USER DAO] : ", error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const result = await userModel.findOne({ email });
      if (result) {
        return {
          message: "user found",
          status: "success",
          code: 200,
          data: result,
        };
      } else {
        return {
          message: "user not found",
          status: "fail",
          code: 201,
          data: result,
        };
      }
    } catch (error) {
      log.error("Error from [USER DAO] : ", error);
      throw error;
    }
  }

  //getUserByContact
  async getUserByContact(contact) {
    try {
      const result = await userModel.findOne({ contact });
      if (result) {
        return {
          message: "user found",
          status: "success",
          code: 200,
          data: result,
        };
      } else {
        return {
          message: "user not found",
          status: "fail",
          code: 201,
          data: result,
        };
      }
    } catch (error) {
      log.error("Error from [USER DAO] : ", error);
      throw error;
    }
  }

  async createUser(data) {
    try {
      const userId = "User_" + (await getNextSequenceValue("user"));
      data.userId = userId;
      const user = new userModel(data);
      const userInfo = await user.save();
      log.info("User saved");
      if (userInfo) {
        return {
          message: "User creation successful",
          status: "success",
          code: 200,
          data: userInfo,
        };
      } else {
        log.error("Error from [USER DAO] : user creation error");
        throw error;
      }
    } catch (error) {
      log.error("Error from [USER DAO] : ", error);
      throw error;
    }
  }

  //deleteUser
  async deleteUserById(userId) {
    try {
      const result = await userModel.findOneAndDelete({ userId });
      if (result) {
        return {
          message: "user delete successfully",
          status: "success",
          code: 200,
          data: result,
        };
      }
    } catch (error) {
      log.error("Error from [USER DAO] : ", error);
      throw error;
    }
  }

  async updateUser(userId, data) {
    try {
      let result;
      const userInfo = await userModel.findOneAndUpdate(
        { userId: userId },
        data,
        {
          new: true,
        }
      );
      console.log("sssssssssssssssstttttttttttttt", userInfo);

      if (result) {
        return {
          message: "user updated",
          status: "success",
          code: 200,
          data: result,
        };
      } else {
        return {
          message: "user not found",
          status: "failed",
          code: 201,
          data: null,
        };
      }
    } catch (error) {
      log.error("Error from [USER DAO] : ", error);
      throw error;
    }
  }
  
}
module.exports = new UserDao();
