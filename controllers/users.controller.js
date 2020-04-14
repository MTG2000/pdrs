const Response = require("../helpers/response");
const UsersService = require("../ApplicationLayer/users");

class Controller {
  getAllUsers = async (req, res, next) => {
    try {
      const users = await UsersService.getAllUsers();
      res.send(new Response.Data(users));
    } catch (error) {
      next(error);
    }
  };

  loginUser = async (req, res, next) => {
    //Verify credentials

    try {
      const { username, password } = req.body;
      const { accessToken, response } = await UsersService.login(
        username,
        password
      );
      //set cookie with the token
      res.cookie("accessToken", accessToken, {
        secure: false, // set to true if your using https
        httpOnly: true
      });
      res.send(
        new Response.Data({ ...response }, "Logged-In Successfully", "")
      );
    } catch (error) {
      next(error);
    }
  };

  getPatient = async (req, res, next) => {
    try {
      const { id } = req.query;
      const patient = await UsersService.getPatient(id);
      res.send(new Response.Data(patient));
    } catch (error) {
      next(error);
    }
  };

  registerUser = async (req, res, next) => {
    try {
      const {
        username,
        password: passwordRaw,
        type,
        contact,
        doctorName,
        pharmacyName,
        address
      } = req.body;

      await UsersService.registerUser(username, passwordRaw, type, contact, {
        doctorName,
        pharmacyName,
        address
      });
      res.send(new Response.Success("User Registered Successfully"));
      next();
    } catch (error) {
      next(error);
    }
  };

  toggleUserActiveState = async (req, res, next) => {
    try {
      const { id } = req.body;
      await UsersService.toggleUserActive(id);
      res.send(new Response.Success("Active Statuse Changed"));
    } catch (error) {
      next(error);
    }
  };

  requestAccount = async (req, res, next) => {
    try {
      const { name, type, phone, email } = req.body;
      await UsersService.requestAccount(name, type, phone, email);
      res.send(new Response.Success("Your Request Was Sent Successfully"));
    } catch (error) {
      next(error);
    }
  };

  getMessagesCategories = async (req, res, next) => {
    try {
      const msgsCategories = await UsersService.getMessagesCategories();
      res.send(new Response.Data(msgsCategories));
    } catch (error) {
      next(error);
    }
  };

  addNewMessage = async (req, res, next) => {
    try {
      const { category, content } = req.body;
      const username = req.user.username;
      await UsersService.addNewMessage(username, category, content);
      res.send(new Response.Success("Your Message Was Sent Successfully"));
    } catch (error) {
      next(error);
    }
  };

  logout = async (req, res, next) => {
    try {
      res.clearCookie("accessToken");
      await UsersService.logout(req.user.username);
      res.send(new Response.Success("Logged Out Successfully"));
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (req, res, next) => {
    try {
      const { refreshToken, username } = req.body;

      const result = await UsersService.refreshToken(refreshToken, username);

      res.cookie("accessToken", result.accessToken, {
        secure: false, // set to true if your using https
        httpOnly: true
      });
      res.send(new Response.Data({ refreshToken: result.refreshToken }));
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new Controller();
