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

const transactionCommit = async (req, res, next) => {
  // console.log("Transaction End");

  try {
    if (!req.transactionBegin) {
      next();
      return;
    }
    await commitTransaction();
    next();
  } catch (error) {
    rollbackTransaction();
    next(error);
  }
};

const transactionRollback = async (err, req, res, next) => {
  // console.log("Transaction End");

  try {
    if (!req.transactionBegin) {
      next(err);
      return;
    }
    await rollbackTransaction();
    next(err);
  } catch (error) {
    rollbackTransaction();
    next(error);
  }
};

module.exports = { transactionBegin, transactionCommit, transactionRollback };
