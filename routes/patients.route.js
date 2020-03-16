const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const controller = require("../controllers/patients.controller");

router.post(
  "/new-prescription",
  authMiddleware(["Doctor"]),
  controller.newPrescription
);

router.get("/prescriptions", authMiddleware(), controller.getPrescriptions);

module.exports = router;
