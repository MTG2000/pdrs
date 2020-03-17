const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const transactionBeginMiddleware = require("../middleware/sqlTransaction")
  .transactionBegin;
const controller = require("../controllers/medicins.controller");

router.get("/classifications", controller.getClassifications);

router.post(
  "/new",
  authMiddleware(["Admin"]),
  transactionBeginMiddleware,
  controller.newMedicine
);

router.get("/", controller.getMedicins);

module.exports = router;
