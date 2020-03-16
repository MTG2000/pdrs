const repository = require("../repositories/users.repository");
const authService = require("../services/auth");

const loginUser = async (req, res) => {
  //Verify credentials
  const { username, password } = req.body;
  const user = await repository.getUser(username, password);
  const role = await repository.getUserTypeById(user.UserType_ID);

  if (!user)
    //User Doesn't exist or wrong credentials
    return res.status(401).json("Incorrect Credentials");

  const token = authService.generateToken({
    username: user.USERNAME,
    role: role
  });

  //set cookie with the token
  res
    .cookie("token", token, {
      secure: false, // set to true if your using https
      httpOnly: true
    })
    .status(200)
    .send("Successfully login");
};

const getPatients = async (req, res) => {
  const { id } = req.query;
  const patinets = await repository.getPatients(id);
  res.send(patinets);
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

const registerUser = async (req, res) => {
  const type = req.body.type;
  if (type === "doctor") {
    const { username, password, doctorName } = req.body;
    const doctorId = await repository.insertDoctor(
      username,
      password,
      doctorName
    );
    return res.json(doctorId);
  } else if (type === "pharmacy") {
    const { username, password, pharmacyName, address } = req.body;
    const pharmacyId = await repository.insertPharmacy(
      username,
      password,
      pharmacyName,
      address
    );
    return res.json(pharmacyId);
  }

  res.status(400).send({ error: "Type Not Available" });
};

module.exports = { getPatients, registerUser, newPharmacy, loginUser };
