const sql = require("sqlite-async");
const sqlQueries = require("./sql-queries");
let db;

const initializeConnection = async path => {
  try {
    return await sql.open(path, sql.OPEN_READWRITE | sql.OPEN_CREATE);
  } catch (error) {
    console.log(error);
  }
};

const initializeTables = async db => {
  //Create Users Table
  await db.run(sqlQueries.createPatientsTable);
};

const addPatient = async (id, name) => {
  try {
    await db.run(sqlQueries.insertNewPatient, [id, name]);
  } catch (error) {
    console.log(error);
  }
};

// const getPatient = async id => {
//   try {
//     const res = await db.all(`SELECT ID,NAME from patients`);
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// };

const seedPatients = async () => {
  await addPatient("12344", "محمد عبد الحميد");
  await addPatient("123444", "احمد حسن ريحاوي");
  await addPatient("125344", "عبد الحليم حافظ");
};

const getDb = async () => {
  if (!db) {
    db = await initializeConnection("./db/pdrs.db");
    await initializeTables(db);
    // await seedPatients();
  }
  return db;
};

module.exports = { getDb, initializeConnection, initializeTables };
