const DB = require("../services/db").DB;
const sqlQueries = require("../db/sql-queries");

const getMedicins = async medicineName => {
  try {
    return await DB.queryAll(sqlQueries.getMedicinsByName, [
      `${medicineName}%`
    ]);
  } catch (error) {
    console.log(error);
  }
};

const medicineExist = async medicineName => {
  try {
    return await DB.get(sqlQueries.medicineExist, [medicineName]);
  } catch (error) {
    console.log(error);
  }
};

const addMedicine = async medicineName => {
  try {
    return (await DB.run(sqlQueries.insert_Medicine, [medicineName])).lastId;
  } catch (error) {
    console.log(error);
  }
};

const getClassifications = async () => {
  try {
    return await DB.queryAll(sqlQueries.getClassificationsAll);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addMedicine,
  getMedicins,
  getClassifications,
  medicineExist
};
