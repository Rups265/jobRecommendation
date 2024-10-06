const express = require("express");
const router = express.Router();
const JWT = require("../middleware/auth.middleware");
const log = require("../configs/logger.config");
const UserController = require("../controllers/auth.controller");

router.route("/signUp").post(JWT.authkey, async (req, res) => {
  try {
    const result = await UserController.signUp(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error : ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.route("/login").post(JWT.authkey, async (req, res) => {
  try {
    const result = await UserController.login(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error : ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//update Profile

router
  .route("/editProfile")
  .post(JWT.authenticateJWT, async (req, res) => {
    try {
      const result = await UserController.editProfile(req, res);
      return result;
    } catch (error) {
      log.error("Internal Server Error : ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

router
  .route("/getUserDetail")
  .post(JWT.authenticateJWT, async (req, res) => {
    try {
      const result = await UserController.getUserDetail(req, res);
      return result;
    } catch (error) {
      log.error("Internal Server Error : ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  

module.exports = router;
