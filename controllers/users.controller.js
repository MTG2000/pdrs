const repository = require("../repositories/users.repository");
const authService = require("../services/auth");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const SendResponse = require("../Utils/SendResponse");
const Validation = require("../services/Validation");

class Controller {
  getAllUsers = async (req, res) => {
    const users = await repository.getAllUsers();
    SendResponse.JsonData(res, users);
  };

  loginUser = async (req, res) => {
    //Verify credentials
    const { username, password } = req.body;

    const user = await repository.getUser(username);

    if (!user || !(await bcrypt.compare(password, user.Password)))
      //User Doesn't exist or wrong credentials
      return SendResponse.JsonFailed(res, "Invalid Credentials");

    if (!user.IsActive)
      return SendResponse.JsonFailed(res, "Account Has been de-activated");

    const role = await repository.getUserTypeById(user.UserType_Id);
    const name = await repository.getUserRealName(user.Id);
    console.log(name);
    const token = authService.generateToken({
      username: user.Username,
      role
    });

    //set cookie with the token
    res.cookie("token", token, {
      secure: false, // set to true if your using https
      httpOnly: true
    });
    SendResponse.JsonSuccess(res, "Logged-In Successfully", "", {
      username: user.Username,
      role: role,
      token,
      name
    });
  };

  getPatient = async (req, res) => {
    const { id } = req.query;

    const patinet = await repository.getPatient(id);
    if (patinet) SendResponse.JsonData(res, patinet);
    else SendResponse.JsonNotFound(res);
  };

  registerUser = async (req, res, next) => {
    try {
      const { username, password: passwordRaw, type, contact } = req.body;
      await Validation.registerUser(req.body);

      const password = await bcrypt.hash(passwordRaw, saltRounds);
      if (type === "Doctor") {
        const { doctorName } = req.body;
        const doctorId = await repository.insertDoctor(
          username,
          password,
          doctorName,
          contact
        );
        SendResponse.JsonCreated(res, "Doctor Created Successfully");
        next();
        return;
      } else if (type === "Pharmacy") {
        const { pharmacyName, address } = req.body;
        const pharmacyId = await repository.insertPharmacy(
          username,
          password,
          pharmacyName,
          address,
          contact
        );
        SendResponse.JsonCreated(res, "Pharmacy Created Successfully");
        next();
        return;
      }
      res.failed = true;
      SendResponse.JsonFailed(res, "Type Not Valid");
      next();
    } catch (error) {
      console.error(error);
      res.failed = true;

      SendResponse.JsonFailed(res, "Could Not Register User");
      next();
    }
  };

  toggleUserActiveState = async (req, res, next) => {
    try {
      const { id } = req.body;
      await repository.toggleUserActiveState(id);
      SendResponse.JsonSuccess(res, "User Active state change successfully");
    } catch (error) {
      SendResponse.JsonFailed(res, "Something Wrong Happened");
    }
  };
}

module.exports = new Controller();
