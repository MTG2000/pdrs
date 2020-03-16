const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const controller = require("../controllers/medicins.controller");

router.get("/classifications", controller.getMedicins);

router.post("/new", controller.newMedicine);

router.get("/", controller.getMedicins);

module.exports = router;
