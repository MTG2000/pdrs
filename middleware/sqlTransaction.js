const {
  begingTransaction,
  commitTransaction,
  rollbackTransaction
} = require("../services/db");

module.exports = async (req, res, next) => {
  await begingTransaction();
  next();
  if (res.failed) {
    await rollbackTransaction();
  } else {
    await commitTransaction();
  }
};
