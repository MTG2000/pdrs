const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const transactionBeginMiddleware = require("../middleware/sqlTransaction")
  .transactionBegin;
const controller = require("../controllers/patients.controller");

router.post(
  "/new-prescription",
  authMiddleware(["Doctor"]),
  transactionBeginMiddleware,
  controller.newPrescription
);

router.post(
  "/stop-chronic",
  authMiddleware(["Doctor"]),
  transactionBeginMiddleware,
  controller.stopChronicMedicine
);

router.post(
  "/dispense",
  authMiddleware(["Pharmacy"]),
  transactionBeginMiddleware,
  controller.dispenseMedicins
);

router.get(
  "/prescriptions-to-dispense",
  authMiddleware(["Pharmacy"]),
  controller.getPrescriptionsToDispense
);

router.get("/prescriptions", authMiddleware(), controller.getPrescriptions);

module.exports = router;
