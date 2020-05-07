const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const transactionBeginMiddleware = require("../middleware/sqlTransaction")
  .transactionBegin;
const controller = require("../controllers/medicins.controller");

router.get("/classifications", controller.getClassifications);

router.get("/conditions", controller.getConditions);

router.post("/new", authMiddleware(["Admin"]), controller.newMedicine);

router.get("/", authMiddleware(), controller.getMedicins);

module.exports = router;
