const express = require("express");
const router = express.Router();
const JWT = require("../middleware/auth.middleware");
const jobControllers = require("../controllers/job.controller");
const log = require("../configs/logger.config");

//read
router.route("/addJob").post(JWT.authenticateJWT, async (req, res) => {
  try {
    const result = await jobControllers.addJob(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error : ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
router.route("/getJobById").post(JWT.authkey, async (req, res) => {
  try {
    const result = await jobControllers.getJobById(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error : ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.route("/getAllJob").post(JWT.authkey, async (req, res) => {
  try {
    const result = await jobControllers.getAllJob(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error : ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.route("/updateJobById").post(JWT.authkey, async (req, res) => {
  try {
    const result = await jobControllers.updateJobById(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error : ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
router.route("/deleteJobById").post(JWT.authkey, async (req, res) => {
  try {
    const result = await jobControllers.deleteJobById(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error : ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
router
  .route("/getJobByCategory")
  .post(JWT.authkey, async (req, res) => {
    try {
      const result = await jobControllers.getJobByCategory(req, res);
      return result;
    } catch (error) {
      log.error("Internal Server Error : ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router
  .route("/recommendedJob")
  .post(JWT.authenticateJWT, async (req, res) => {
    try {
      const result = await jobControllers.recommendedJob(req, res);
      return result;
    } catch (error) {
      log.error("Internal Server Error : ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });




module.exports = router;
