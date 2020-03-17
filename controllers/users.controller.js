const repository = require("../repositories/users.repository");
const authService = require("../services/auth");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const loginUser = async (req, res) => {
  //Verify credentials
  const { username, password } = req.body;
  const user = await repository.getUser(username);
  if (!user || !(await bcrypt.compare(password, user.Password)))
    //User Doesn't exist or wrong credentials
    return res.status(401).json("Incorrect Credentials");

  const role = await repository.getUserTypeById(user.UserType_Id);
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
    .send({
      success: "Successfully login",
      token //Testing Purposes ONLY !!!!!!!!!!!
    });
};

const getPatients = async (req, res) => {
  const { id } = req.query;
  const patinets = await repository.getPatients(id);
  res.send(patinets);
};

const newPharmacy = async (req, res) => {
  try {
    const { username, password, pharmacyName, address } = req.body;
    const pharmacyId = await repository.insertPharmacy(
      username,
      password,
      pharmacyName,
      address
    );
    res.json(pharmacyId);
  } catch (error) {
    console.error(error);
    res.failed = true;
    res.status(400).json({ error: error });
  }
};

const registerUser = async (req, res, next) => {
  try {
    const type = req.body.type;
    const { username, password: passwordRaw } = req.body;
    const password = await bcrypt.hash(passwordRaw, saltRounds);
    if (type === "doctor") {
      const { doctorName } = req.body;
      const doctorId = await repository.insertDoctor(
        username,
        password,
        doctorName
      );
      res.json(doctorId);
      next();
      return;
    } else if (type === "pharmacy") {
      const { pharmacyName, address } = req.body;
      const pharmacyId = await repository.insertPharmacy(
        username,
        password,
        pharmacyName,
        address
      );
      res.json(pharmacyId);
      next();
      return;
    }
    res.status(400).send({ error: "Type Not Available" });
  } catch (error) {
    console.error(error);
    res.failed = true;
    res.status(400).json({ error: error });
    next();
  }
};

module.exports = { getPatients, registerUser, newPharmacy, loginUser };
