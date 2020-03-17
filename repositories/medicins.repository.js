const DB = require("../services/db").DB;
const sqlQueries = require("../db/sql-queries");

const getMedicins = async medicineName => {
  return await DB.queryAll(sqlQueries.getMedicinsByName, [`${medicineName}%`]);
};

const medicineExist = async medicineName => {
  return await DB.get(sqlQueries.medicineExist, [medicineName]);
};

const addMedicine = async medicineName => {
  const result = await DB.run(sqlQueries.insert_Medicine, [medicineName]);
  return result.lastID;
};

const getClassifications = async () => {
  return await DB.queryAll(sqlQueries.getClassificationsAll);
};

module.exports = {
  addMedicine,
  getMedicins,
  getClassifications,
  medicineExist
};
