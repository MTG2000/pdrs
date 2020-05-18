const DB = require("../services/db").DB;
const sqlQueries = require("../db/sql-queries");
const CacheService = require("../services/cache");

const cache = new CacheService(60 * 60);
class Repository {
  getMedicins = async (medicineName) => {
    const allMeds = await cache.get("getMedicins", async () => {
      return await DB.queryAll(sqlQueries.getAllMedicins);
    });
    medicineName = medicineName.toLowerCase();
    return allMeds.filter((m) => m.Name.toLowerCase().startsWith(medicineName));
  };

  medicineExist = async (medicineName) => {
    return await DB.get(sqlQueries.medicineExist, [medicineName]);
  };

  addMedicine = async (medicineName) => {
    const result = await DB.run(sqlQueries.insert_Medicine, [medicineName]);
    cache.del("getMedicins");
    return result.lastID;
  };

  getClassifications = async () => {
    return await cache.get("getClassifications", async () => {
      return await DB.queryAll(sqlQueries.getClassificationsAll);
    });
  };

  addClassification = async (name, imageUrl) => {
    const result = await DB.run(sqlQueries.insert_Classification, [
      name,
      imageUrl,
    ]);
    cache.del("getClassifications");
    return result.lastID;
  };

  getConditionsByClassification = async (classification) => {
    return await cache.get(`getConditions-${classification}`, async () => {
      return await DB.queryAll(sqlQueries.getConditionsByClassification, [
        classification,
      ]);
    });
  };
}

module.exports = new Repository();
