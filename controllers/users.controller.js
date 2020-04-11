const repository = require("../repositories/users.repository");
const authService = require("../services/auth");
const argon = require("argon2");
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

    const user = await repository.getUserByUsername(username);

    if (!user || !(await argon.verify(user.Password, password)))
      //User Doesn't exist or wrong credentials
      return SendResponse.JsonFailed(res, "Invalid Credentials");

    if (!user.IsActive)
      return SendResponse.JsonFailed(res, "Account Has been de-activated");

    const role = await repository.getUserTypeById(user.UserType_Id);
    const name = await repository.getUserRealName(user.Id);
    const accessToken = await authService.generateAccessToken({
      username: user.Username,
      role
    });
    //update refresh token
    const refreshToken = await authService.generateRefreshToken({
      username: user.Username
    });
    await repository.insertUserToken(user.Id, refreshToken);
    //set cookie with the token
    res.cookie("accessToken", accessToken, {
      secure: false, // set to true if your using https
      httpOnly: true
    });

    SendResponse.JsonSuccess(res, "Logged-In Successfully", "", {
      username: user.Username,
      role: role,
      token: accessToken,
      refreshToken,
      ...name
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

      const password = await argon.hash(passwordRaw);
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

  requestAccount = async (req, res, next) => {
    try {
      const { name, type, phone, email } = req.body;
      await repository.addAccountRequest(name, type, phone, email);
      SendResponse.JsonSuccess(res, "Your Request Was Sent Successfully");
    } catch (error) {
      SendResponse.JsonFailed(res, "Something Wrong Happened");
    }
  };

  getMessagesCategories = async (req, res, next) => {
    try {
      const msgsCategories = await repository.getMessagesCategories();
      SendResponse.JsonData(res, msgsCategories);
    } catch (error) {
      SendResponse.JsonFailed(res, "Something Wrong Happened");
    }
  };

  addNewMessage = async (req, res, next) => {
    try {
      const { category, content } = req.body;
      const userId = (await repository.getUserByUsername(req.user.username)).Id;
      await repository.addMessage(userId, category, content);
      SendResponse.JsonSuccess(res, "Your Message was sent successfully");
    } catch (error) {
      SendResponse.JsonFailed(res, "Something Wrong Happened");
    }
  };

  logout = async (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    SendResponse.JsonSuccess(res, "Logged Out Successfully");
  };

  refreshToken = async (req, res) => {
    try {
      const refreshToken = req.body.refreshToken;
      const username = req.body.username;

      const isValid = await repository.refreshTokenValid(
        refreshToken,
        username
      );
      if (!isValid) throw Error("User Not Authenticated");

      const user = await repository.getUserByUsername(username);
      const role = await repository.getUserTypeById(user.UserType_Id);
      const accessToken = await authService.generateAccessToken({
        username,
        role
      });

      res.cookie("accessToken", accessToken, {
        secure: false, // set to true if your using https
        httpOnly: true
      });
      SendResponse.JsonSuccess(res);
    } catch (error) {
      SendResponse.JsonFailed(res);
    }
  };
}

module.exports = new Controller();
