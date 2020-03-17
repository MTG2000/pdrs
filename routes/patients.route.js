const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const sqlTrxMiddleware = require("../middleware/sqlTransaction");
const controller = require("../controllers/patients.controller");

router.post(
  "/new-prescription",
  authMiddleware(["Doctor"]),
  sqlTrxMiddleware,
  controller.newPrescription
);

router.post(
  "/stop-chronic",
  authMiddleware(["Doctor"]),
  sqlTrxMiddleware,
  controller.stopChronicMedicine
);

router.post(
  "/dipense",
  authMiddleware(["Pharmacy"]),
  sqlTrxMiddleware,
  controller.dispenseMedicins
);

router.get("/prescriptions", authMiddleware(), controller.getPrescriptions);

module.exports = router;
