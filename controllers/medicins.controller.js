const repository = require("../repositories/medicins.repository");

const getMedicins = async (req, res) => {
  const { name = "" } = req.query;
  const medicins = await repository.getMedicins(name);

  res.json(medicins);
};

const getClassifications = async (req, res) => {
  const classifications = await repository.getClassifications();
  res.send(classifications);
};

const newMedicine = async (req, res) => {
  const { name } = req.body;
  const medicineExist = await repository.medicineExist(name);
  if (!medicineExist) {
    const medicineId = await repository.addMedicine(name);
    res.status(201).json(medicineId);
  } else res.status(400).send({ error: "Medicine Already Inserted" });
};

module.exports = { getMedicins, getClassifications, newMedicine };
