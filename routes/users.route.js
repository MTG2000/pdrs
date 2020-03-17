const router = require("express").Router();
const controller = require("../controllers/users.controller");
const authMiddleware = require("../middleware/auth");
const transactionBeginMiddleware = require("../middleware/sqlTransaction")
  .transactionBegin;

router.post("/login", controller.loginUser);

router.post(
  "/register",
  authMiddleware(["Admin"]),
  transactionBeginMiddleware,
  controller.registerUser
);

router.get("/patients", controller.getPatients);

module.exports = router;
