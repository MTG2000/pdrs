const DB = require("../services/db");

before(async () => {
  await DB.initializeDB(true, true, false);
});
