const MedicinsDomain = require("../DomainLayer/medicins.repository");
const ApiError = require("../helpers/error");

const getMedicins = async (name = "") => {
  return await MedicinsDomain.getMedicins(name);
};

const getClassifications = async () => {
  return await MedicinsDomain.getClassifications();
};

const newMedicine = async (name) => {
  if (!name) throwApiError.BadRequest("Medicine doesnt have a name");
  const medicineExist = await MedicinsDomain.medicineExist(name);
  if (!medicineExist) {
    await MedicinsDomain.addMedicine(name);
  } else throw ApiError.BadRequest("medicine already exist");
};

const newClassification = async (name, imageUrl) => {
  if (!name) ApiError.BadRequest("Classification doesnt have a name");
  await MedicinsDomain.addClassification(name, imageUrl);
};

const newCondition = async (name, classification) => {
  if (!name) throw ApiError.BadRequest("condition doesnt have a name");
  await MedicinsDomain.addCondition(name, classification);
};

const getConditionsByClassification = async (classification) => {
  return await MedicinsDomain.getConditionsByClassification(classification);
};

module.exports = {
  getMedicins,
  getClassifications,
  newMedicine,
  getConditionsByClassification,
  newClassification,
  newCondition,
};
