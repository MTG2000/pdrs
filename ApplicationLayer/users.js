const authService = require("../services/auth");
const argon = require("argon2");
const Validation = require("../services/Validation");
const UsersDomain = require("../DomainLayer/users.repository");
const sha256 = require("crypto-js/sha256");
const Axios = require("axios");
const ApiError = require("../helpers/error");

class UserAppService {
  async getAllUsers() {
    return await UsersDomain.getAllUsers();
  }

  async login(username, password) {
    //Verify credentials

    const user = await UsersDomain.getUserByUsername(username);

    if (!user || !(await argon.verify(user.Password, password)))
      //User Doesn't exist or wrong credentials
      throw ApiError.BadRequest("Invalid Username/Password");
    //   return SendResponse.JsonFailed(res, "Invalid Credentials");

    if (!user.IsActive)
      throw ApiError.BadRequest(
        "Account De-Activated",
        "Please contact the admins for more info"
      );

    const name = await UsersDomain.getUserRealName(user.Id);
    const accessToken = await authService.generateAccessToken({
      username: user.Username,
      role: user.Type,
    });
    //update refresh token
    const refreshToken = sha256(Math.random().toString()).toString();

    await UsersDomain.updateUserToken(user.Id, refreshToken);

    return {
      accessToken: accessToken,
      response: {
        username: user.Username,
        role: user.Type,
        accessToken,
        refreshToken,
        ...name,
      },
    };
  }

  async getPatient(id) {
    const patient = await UsersDomain.getPatient(id);
    if (!patient) throw ApiError.NotFound("No Patient with this Id");
    return patient;
  }

  async registerUser(username, passwordRaw, type, contact, additionalInfo) {
    await Validation.registerUser({
      username,
      password: passwordRaw,
      type,
      contact,
    });

    const password = await argon.hash(passwordRaw);
    if (type === "Doctor") {
      const { doctorName } = additionalInfo;
      await UsersDomain.insertDoctor(username, password, doctorName, contact);

      return;
    } else if (type === "Pharmacy") {
      const { pharmacyName, address } = additionalInfo;
      const pharmacyId = await UsersDomain.insertPharmacy(
        username,
        password,
        pharmacyName,
        address,
        contact
      );

      return;
    } else if (type === "Admin") {
      //Logic for inserting Admin
    }
    throw ApiError.BadRequest("New user's details not valid");
  }

  async toggleUserActive(id) {
    await UsersDomain.toggleUserActiveState(id);
  }

  async requestAccount(name, type, phone, email, recaptcha) {
    const secret_key = process.env.RECAPTCHA_SECRET;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${recaptcha}`;

    const res = await Axios.post(url);
    if (!res.data.success)
      //recaptcha failed
      throw ApiError.BadRequest("Recaptcha Failded", "Please try again");

    await UsersDomain.addAccountRequest(name, type, phone, email);
  }

  async getMessagesCategories() {
    return await UsersDomain.getMessagesCategories();
  }

  async addNewMessage(username, category, content) {
    const userId = (await UsersDomain.getUserByUsername(username)).Id;
    await UsersDomain.addMessage(userId, category, content);
  }

  async logout(username) {
    const userId = (await UsersDomain.getUserByUsername(username)).Id;
    await UsersDomain.updateUserToken(userId, null);
  }

  async refreshToken(refreshToken, username) {
    const currentToken = await UsersDomain.getRefreshToken(username);

    //Is Token Valid
    if (currentToken === refreshToken) {
      const newRefreshToken = sha256(currentToken).toString();
      const user = await UsersDomain.getUserByUsername(username);

      const accessToken = await authService.generateAccessToken({
        username,
        role: user.Type,
      });
      await UsersDomain.updateUserToken(user.Id, newRefreshToken);

      return { accessToken, refreshToken: newRefreshToken };
    }
    throw ApiError.BadRequest("Refresh Token Invalid");
  }
}

module.exports = new UserAppService();
