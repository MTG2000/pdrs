const router = require("express").Router();
const controller = require("../controllers/users.controller");
const authMiddleware = require("../middleware/auth");
const sqlTrxMiddleware = require("../middleware/sqlTransaction");

router.post("/login", controller.loginUser);

router.post(
  "/register",
  authMiddleware(["Admin"]),
  sqlTrxMiddleware,
  controller.registerUser
);

router.get("/patients", controller.getPatients);

module.exports = router;
