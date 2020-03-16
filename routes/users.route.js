const router = require("express").Router();
const controller = require("../controllers/users.controller");
const authMiddleware = require("../middleware/auth");
const users = [
  {
    name: "mtg",
    pwd: "123",
    role: "admin"
  },
  {
    name: "ahmad",
    pwd: "123",
    role: "doctor"
  },
  {
    name: "nizar",
    pwd: "123",
    role: "user"
  }
];

router.post("/login", controller.loginUser);

router.post("/register", controller.registerUser);

router.get("/private", authMiddleware(), (req, res) => {
  res.send(req.user);
});

router.get("/private-admin", authMiddleware("admin"), (req, res) => {
  res.send(req.user);
});

router.get("/patients", controller.getPatients);

module.exports = router;
