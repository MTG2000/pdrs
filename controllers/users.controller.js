const repository = require("../repositories/users.repository");
const authService = require("../services/auth");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const SendResponse = require("../Utils/SendResponse");
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
    const token = authService.generateToken({
      username: user.Username,
      role: role
    });

    //set cookie with the token
    res.cookie("token", token, {
      secure: false, // set to true if your using https
      httpOnly: true
    });
    SendResponse.JsonSuccess(res, "Logged-In Successfully", "", {
      username: user.Username,
      role: role
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
        SendResponse.JsonCreated(res, "Doctor Created Successfully");
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
        SendResponse.JsonCreated(res, "Pharmacy Created Successfully");
        next();
        return;
      }
      SendResponse.JsonFailed(res, "Type Not Valid");
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
