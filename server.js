const express = require("express");
const server = express();
const cookieParser = require("cookie-parser");
const DB = require("./services/db");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

const dev = server.get("env") !== "production";

morgan.token("user", (req, res) => {
  return (req.user && req.user.username) || "";
});
server.use(morgan(":user :method :url :status - :response-time ms"));

if (!dev) {
  server.disable("x-powerd-by");
  server.use(compression());
}
server.use(cors());
server.use(helmet());
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

// only apply to requests that begin with /api/
server.use("/api/", apiLimiter);
server.use(express.static(path.join(__dirname, "static")));
server.use(express.static(path.resolve(__dirname, "client", "build")));
server.use(express.static(path.resolve(__dirname, "admin-dashboard", "build")));
server.use(favicon(path.resolve(__dirname, "client", "build", "favicon.ico")));
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/api/patients", require("./routes/patients.route"));
server.use("/api/medicins", require("./routes/medicins.route"));
server.use("/api/users", require("./routes/users.route"));
server.use("/api/admin", require("./routes/admin.route"));

(async () => {
  if (server.get("env") === "test") return; //Initialize the db is done in the test setup file
  if (server.get("env") === "development")
    await DB.initializeDB(false, false, false);
  else await DB.initializeDB(false, false, false);
})();

server.get("/admin", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "admin-dashboard", "build", "index.html")
  );
});
server.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

//REMEMBER TO KEEP THIS AT THE END (BECAUSE IT USES res.end())
server.use(require("./middleware/sqlTransaction").transactionCommit);
server.use(require("./middleware/sqlTransaction").transactionRollback);

//to centeralize Errors handling
server.use(require("./middleware/handleError"));

//Handling uncaught excpentions
process.on("uncaughtException", err => {
  console.error(`Uncaught Exception: ${err}`);
  process.exit(1);
});

module.exports = server;
