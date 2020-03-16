const repository = require("../repositories/medicins.repository");

const getMedicins = async (req, res) => {
  const { name } = req.params;
  const medicins = await repository.getMedicins(name);
  res.send(medicins);
};

const getClassifications = async (req, res) => {
  const classifications = await repository.getClassifications();
  res.send(classifications);
};

module.exports = { getMedicins, getClassifications };
