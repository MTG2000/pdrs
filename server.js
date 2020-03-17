const express = require("express");
const server = express();
const cookieParser = require("cookie-parser");
const DB = require("./services/db");
require("dotenv").config();

const dev = server.get("env") !== "production";

if (!dev) {
  server.disable("x-powerd-by");
  server.use(morgan("common"));
  server.use(compression());
}

// server.use(cors());
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

server.use(require("./middleware/sqlTransaction").transactionEnd);
(async () => {
  if (server.get("env") === "development")
    await DB.initializeDB(true, true, true);
  else await DB.initializeDB(false, false, false);
})();

module.exports = server;
