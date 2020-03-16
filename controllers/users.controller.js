const repository = require("../repositories/users.repository");

const getPatients = async (req, res) => {
  const users = await repository.getPatients();
  res.send(users);
};

const newPharmacy = async (req, res) => {
  const { username, password, pharmacyName, address } = req.body;
  const pharmacyId = await repository.insertPharmacy(
    username,
    password,
    pharmacyName,
    address
  );
  return pharmacyId;
};

const newDoctor = async (req, res) => {
  const { username, password, doctorName } = req.body;
  const doctorId = await repository.insertDoctor(
    username,
    password,
    doctorName
  );
  return doctorId;
};

module.exports = { getPatients, newDoctor, newPharmacy };
