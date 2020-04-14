const DB = require("../services/db").DB;
const sqlQueries = require("../db/sql-queries");
const CacheService = require("../services/cache");

const cache = new CacheService(60 * 60);

const getMedicins = async medicineName => {
  const allMeds = await cache.get("getMedicins", async () => {
    return await DB.queryAll(sqlQueries.getAllMedicins);
  });
  medicineName = medicineName.toLowerCase();
  return allMeds.filter(m => m.Name.toLowerCase().startsWith(medicineName));
};

const medicineExist = async medicineName => {
  return await DB.get(sqlQueries.medicineExist, [medicineName]);
};

const addMedicine = async medicineName => {
  const result = await DB.run(sqlQueries.insert_Medicine, [medicineName]);
  cache.del("getMedicins");
  return result.lastID;
};

const getClassifications = async () => {
  return await cache.get("getClassifications", async () => {
    return await DB.queryAll(sqlQueries.getClassificationsAll);
  });
};

module.exports = {
  addMedicine,
  getMedicins,
  getClassifications,
  medicineExist
};
