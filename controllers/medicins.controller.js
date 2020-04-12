const repository = require("../repositories/medicins.repository");
const SendResponse = require("../Utils/SendResponse");

const getMedicins = async (req, res) => {
  const { name = "" } = req.query;
  const medicins = await repository.getMedicins(name);
  SendResponse.JsonData(res, medicins);
};

const getClassifications = async (req, res) => {
  const classifications = await repository.getClassifications();
  SendResponse.JsonData(res, classifications);
};

const newMedicine = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) throw Error();
    const medicineExist = await repository.medicineExist(name);
    if (!medicineExist) {
      const medicineId = await repository.addMedicine(name);
      SendResponse.JsonCreated(res, "Medicine Added Successfully");
    } else SendResponse.JsonFailed(res, "Medicine Already exist");
  } catch (error) {
    res.failed = true;
    SendResponse.JsonFailed(res);
  }
  next();
};

module.exports = { getMedicins, getClassifications, newMedicine };
