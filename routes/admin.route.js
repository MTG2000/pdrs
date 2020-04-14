const router = require("express").Router();
const authMiddleware = require("../middleware/auth");

const controller = require("../controllers/admin.controller");

router.get(
  "/new-account-requests",
  authMiddleware(["Admin"]),
  controller.getNewAccountRequests
);

router.get(
  "/new-messages",
  authMiddleware(["Admin"]),
  controller.getNewMessages
);

router.post(
  "/read-message",
  authMiddleware(["Admin"]),
  controller.markMessageRead
);

router.post(
  "/read-account-request",
  authMiddleware(["Admin"]),
  controller.markAccountRequestRead
);

module.exports = router;
