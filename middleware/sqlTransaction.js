const {
  begingTransaction,
  commitTransaction,
  rollbackTransaction
} = require("../services/db");

const transactionBegin = async (req, res, next) => {
  try {
    // console.log("Transaction Begin");
    await begingTransaction();
    req.transactionBegin = true;
    next();
  } catch (error) {
    await rollbackTransaction();
  }
};

const transactionEnd = async (req, res, next) => {
  // console.log("Transaction End");

  try {
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
  } catch (error) {
    rollbackTransaction();
  }
};

module.exports = { transactionBegin, transactionEnd };
