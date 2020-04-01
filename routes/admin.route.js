const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const transactionBeginMiddleware = require("../middleware/sqlTransaction")
  .transactionBegin;
const controller = require("../controllers/admin.controller");

router.get("/new-account-requests", controller.getNewAccountRequests);

router.get("/new-messages", controller.getNewMessages);

router.post("/read-message", controller.markMessageRead);

router.post("/read-account-request", controller.markAccountRequestRead);

module.exports = router;
