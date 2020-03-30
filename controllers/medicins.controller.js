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
    const medicineExist = await repository.medicineExist(name);

    if (!medicineExist) {
      const medicineId = await repository.addMedicine(name);
      res.status(201).json(medicineId);
    } else res.status(400).send({ error: "Medicine Already Inserted" });
  } catch (error) {
    console.error(error);
    res.failed = true;
    SendResponse.JsonFailed(res, error);
  }
  next();
};

module.exports = { getMedicins, getClassifications, newMedicine };
