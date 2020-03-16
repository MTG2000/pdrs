const sql = require("sqlite-async");
const sqlQueries = require("../db/sql-queries");
const seedTables = require("../db/sql-db-seed");
let db;

const initializeConnection = async path => {
  try {
    return await sql.open(path, sql.OPEN_READWRITE | sql.OPEN_CREATE);
  } catch (error) {
    console.log("ERROR Creating or opening the database");
    console.log(error);
  }
};

const initializeTables = async (db, dropExisitingTables = false) => {
  try {
    if (dropExisitingTables)
      for (const sql of sqlQueries.dropAllTablesPatch) {
        await run(sql);
      }
    await begingTransaction();
    const createTablesStatements = sqlQueries.createTablesPatch;
    for (let i = 0; i < createTablesStatements.length; i++) {
      try {
        await db.run(createTablesStatements[i]);
      } catch (error) {
        console.log(
          "An Error happened while running statement:" +
            createTablesStatements[i]
        );
        throw error;
      }
    }

    await commitTransaction();
    console.log("Tables Created Successfully");
  } catch (error) {
    await rollbackTransaction();
  }
};

(async () => {
  db = await initializeConnection("./db/pdrs.db");
  await initializeTables(db);
  // await seedTables(run);
})();

const begingTransaction = async () => {
  await db.run(sqlQueries.transactionBegin);
};

const commitTransaction = async () => {
  await db.run(sqlQueries.transactionCommit);
};

const rollbackTransaction = async () => {
  await db.run(sqlQueries.transactionRollback);
};

const queryAll = async (sql, params = []) => {
  return await db.all(sql, [...params]);
};

const get = async (sql, params = []) => {
  return await db.get(sql, [...params]);
};

const run = async (sql, params = []) => {
  return await db.run(sql, [...params]);
};

module.exports = {
  DB: {
    get,
    run,
    queryAll,
    begingTransaction,
    commitTransaction,
    rollbackTransaction
  },
  initializeConnection,
  initializeTables,
  begingTransaction,
  commitTransaction,
  rollbackTransaction
};
