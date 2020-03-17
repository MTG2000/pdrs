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

const initializeTables = async (
  db,
  dropExisitingTables = false,
  log = false
) => {
  try {
    if (dropExisitingTables) {
      log && console.log("Dropping Tables");
      for (const sql of sqlQueries.dropAllTablesPatch) {
        await run(sql);
      }
      log && console.log("Tables Dropped Successfully");
    }
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

    log && console.log("Tables Created Successfully");

    // console.log("Creating Indices");
    for (const sql of sqlQueries.createIndicesPatch) {
      await run(sql);
    }
    // console.log("Indices created successfully");
  } catch (error) {
    console.log("Error Happened white creating tables" + error);
  }
};

// (async () => {
//   db = await initializeConnection("./db/pdrs.db");
//   await begingTransaction();
//   await initializeTables(db, false);
//   // await seedTables(run, get);
//   await commitTransaction();
// })();

const initializeDB = async (seed = false, dropTables = false, log = false) => {
  db = await initializeConnection("./db/pdrs.db");
  await begingTransaction();
  await initializeTables(db, dropTables, log);
  seed && (await seedTables(run, get, log));
  await commitTransaction();
};

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
  initializeDB,
  begingTransaction,
  commitTransaction,
  rollbackTransaction
};
