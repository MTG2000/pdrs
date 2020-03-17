const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const sqlTrxMiddleware = require("../middleware/sqlTransaction");
const controller = require("../controllers/medicins.controller");

router.get("/classifications", controller.getClassifications);

router.post(
  "/new",
  authMiddleware(["Admin"]),
  sqlTrxMiddleware,
  controller.newMedicine
);

router.get("/", controller.getMedicins);

module.exports = router;
