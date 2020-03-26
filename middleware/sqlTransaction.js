const {
  begingTransaction,
  commitTransaction,
  rollbackTransaction
} = require("../services/db");

const transactionBegin = async (req, res, next) => {
  // console.log("Transaction Begin");
  await begingTransaction();
  req.transactionBegin = true;
  next();
};

const transactionEnd = async (req, res, next) => {
  // console.log("Transaction End");

  if (!req.transactionBegin) {
    res.end();
    next();
    return;
  }

  if (res.failed) {
    await rollbackTransaction();
  } else {
    await commitTransaction();
  }
  res.end();
  next();
};

module.exports = { transactionBegin, transactionEnd };
