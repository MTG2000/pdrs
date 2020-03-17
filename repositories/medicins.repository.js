const DB = require("../services/db").DB;
const sqlQueries = require("../db/sql-queries");

const getMedicins = async medicineName => {
  return await DB.queryAll(sqlQueries.getMedicinsByName, [`${medicineName}%`]);
};

const medicineExist = async medicineName => {
  return await DB.get(sqlQueries.medicineExist, [medicineName]);
};

const addMedicine = async medicineName => {
  return (await DB.run(sqlQueries.insert_Medicine, [medicineName])).lastId;
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
