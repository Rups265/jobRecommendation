const authService = require("../services/auth.service");
class AuthController {
  async signUp(req, res) {
    try {
      const result = await authService.signUpService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // login
  async login(req, res) {
    try {
      const result = await authService.loginService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  //userDataService
  async getUserDetail(req, res) {
    try {
      const result = await authService.getUserDetailService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new AuthController();
