const MedicinsDomain = require("../DomainLayer/medicins.repository");
const { ErrorHandler } = require("../helpers/error");

const getMedicins = async (name = "") => {
  return await MedicinsDomain.getMedicins(name);
};

const getClassifications = async () => {
  return await MedicinsDomain.getClassifications();
};

const newMedicine = async (name) => {
  if (!name) throw new ErrorHandler(400, "Medicine doesn't have a name");
  const medicineExist = await MedicinsDomain.medicineExist(name);
  if (!medicineExist) {
    await MedicinsDomain.addMedicine(name);
  } else throw new ErrorHandler(400, "Medicine Already exist");
};

const getConditionsByClassification = async (classification) => {
  return await MedicinsDomain.getConditionsByClassification(classification);
};

module.exports = {
  getMedicins,
  getClassifications,
  newMedicine,
  getConditionsByClassification,
};
