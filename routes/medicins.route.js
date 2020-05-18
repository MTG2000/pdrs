const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const transactionBeginMiddleware = require("../middleware/sqlTransaction")
  .transactionBegin;
const controller = require("../controllers/medicins.controller");
const imgUpload = require("../middleware/multer").imgsUpload;

router.get("/classifications", controller.getClassifications);

router.post(
  "/new-classification",
  authMiddleware(["Admin"]),
  imgUpload.single("image"),
  controller.newClassification
);

router.get("/conditions", controller.getConditions);

router.post("/new", authMiddleware(["Admin"]), controller.newMedicine);

router.get("/", authMiddleware(), controller.getMedicins);

module.exports = router;
