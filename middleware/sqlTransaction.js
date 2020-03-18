const {
  begingTransaction,
  commitTransaction,
  rollbackTransaction
} = require("../services/db");

const transactionBegin = async (req, res, next) => {
  // console.log("Transaction Begin");
  await begingTransaction();
  next();
};

const transactionEnd = async (req, res, next) => {
  // console.log("Transaction End");

  if (res.failed) {
    await rollbackTransaction();
  } else {
    await commitTransaction();
  }
  res.end();
  next();
};

module.exports = { transactionBegin, transactionEnd };
