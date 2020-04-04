const router = require("express").Router();
const controller = require("../controllers/users.controller");
const authMiddleware = require("../middleware/auth");
const transactionBeginMiddleware = require("../middleware/sqlTransaction")
  .transactionBegin;

router.post("/login", controller.loginUser);

router.post("/request-account", controller.requestAccount);

router.post(
  "/toggle-active-state",
  authMiddleware(["Admin"]),
  controller.toggleUserActiveState
);

router.post(
  "/register",
  authMiddleware(["Admin"]),
  transactionBeginMiddleware,
  controller.registerUser
);

router.get("/", authMiddleware(["Admin"]), controller.getAllUsers);

router.get("/patient", controller.getPatient);

module.exports = router;
