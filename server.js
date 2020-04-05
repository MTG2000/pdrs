const express = require("express");
const server = express();
const cookieParser = require("cookie-parser");
const DB = require("./services/db");
const path = require("path");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");

require("dotenv").config();

const dev = server.get("env") !== "production";

if (!dev) {
  server.disable("x-powerd-by");
  server.use(morgan("common"));
  server.use(compression());
}

// server.use(cors());
// support parsing of application/json type post data

server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, "static")));
server.use(express.static(path.resolve(__dirname, "client", "build")));
server.use(express.static(path.resolve(__dirname, "admin-dashboard", "build")));
server.use(favicon(path.resolve(__dirname, "client", "build", "favicon.ico")));

server.use(cookieParser());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
// server.use(
//     cors({
//       origin: [
//         `${process.env.FRONT_URL}`,
//         'http://localhost:3000',
//         'https://mypage.com',
//       ],
//       credentials: true
//     })
//   );

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
server.use(require("./middleware/sqlTransaction").transactionEnd);

module.exports = server;
