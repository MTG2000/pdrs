const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

require("dotenv").config();

const dev = app.get("env") !== "production";

if (!dev) {
  app.disable("x-powerd-by");
  app.use(morgan("common"));
  app.use(compression());
}

const PORT = parseInt(process.env.PORT) || 5000;
// server.use(cors());

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(
//     cors({
//       origin: [
//         `${process.env.FRONT_URL}`,
//         'http://localhost:3000',
//         'https://mypage.com',
//       ],
//       credentials: true
//     })
//   );

app.use("/api/patients", require("./routes/patients.route"));
app.use("/api/medicins", require("./routes/medicins.route"));
app.use("/api/users", require("./routes/users.route"));

//
app.use(require("./middleware/sqlTransaction").transactionEnd);

app.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`);
});
