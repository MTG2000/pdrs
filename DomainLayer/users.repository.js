const DB = require("../services/db").DB;
const sqlQueries = require("../db/sql-queries");
const CacheService = require("../services/cache");

const cache = new CacheService(60 * 60);

class Repository {
  getUserByUsername = async username => {
    return await DB.get(sqlQueries.getUser, [username]);
  };

  toggleUserActiveState = async id => {
    const isActive = (await DB.get(sqlQueries.getUserById, [id])).IsActive;
    if (isActive) {
      await DB.run(sqlQueries.toggleUserInActive, [id]);
      await DB.run(sqlQueries.setUserToken, [null, id]);
    } else await DB.run(sqlQueries.toggleUserActive, [id]);
  };

  //it either returns {DoctorName:'name'} or {PharmacyName:'name'}
  getUserRealName = async id => {
    if (!this.DoctorTypeId) {
      this.DoctorTypeId = (
        await DB.get(sqlQueries.getUserTypeId, ["Doctor"])
      ).Id;
      this.PharmacyTypeId = (
        await DB.get(sqlQueries.getUserTypeId, ["Pharmacy"])
      ).Id;

      this.AdminTypeId = (await DB.get(sqlQueries.getUserTypeId, ["Admin"])).Id;
    }
    const user = await DB.get(sqlQueries.getUserById, [id]);

    if (user.UserType_Id === this.DoctorTypeId)
      return {
        DoctorName: (await DB.get(sqlQueries.getDoctorById, [id])).Name
      };
    else if (user.UserType_Id === this.PharmacyTypeId) {
      return {
        PharmacyName: (await DB.get(sqlQueries.getPharmacyById, [id])).Name
      };
    } else if (user.UserType_Id === this.AdminTypeId) {
      return {
        IsAdmin: true
      };
    }
  };
  getAllUsers = async () => {
    return await cache.get("getAllUsers", async () => {
      let usersRaw = await DB.queryAll(sqlQueries.getAllUsers);
      //Add the actual name of the user  by looking his type first then looking up his name in the appropriate table
      let usersDTO = [];
      for (const user of usersRaw) {
        const name = await this.getUserRealName(user.Id);
        usersDTO.push({
          Id: user.Id,
          Username: user.Username,
          IsActive: user.IsActive,
          Contact: user.Contact,
          ...name
        });
      }
      return usersDTO;
    });
  };

  getPatient = async (id = "") => {
    return await DB.get(sqlQueries.getPatientById, [id]);
  };
  newPatient = async (id, name) => {
    return await DB.run(sqlQueries.insert_Patient, [id, name]);
  };

  getUserTypeId = async name => {
    return await cache.get(`getUserTypeId-${name}`, async () => {
      return (await DB.get(sqlQueries.getUserTypeId, [name])).Id;
    });
  };

  insertUser = async (username, password, type = "pharmacy", contact) => {
    const userTypeId = await this.getUserTypeId(type);
    const newUserId = (
      await DB.run(sqlQueries.insert_User, [
        userTypeId,
        username,
        password,
        contact
      ])
    ).lastID;
    cache.del("getAllUsers");
    return newUserId;
  };

  updateUserToken = async (id, token) => {
    await DB.run(sqlQueries.setUserToken, [id, token]);
  };

  getRefreshToken = async username => {
    const row = await DB.get(sqlQueries.getUserToken, [username]);
    return row.Token;
  };

  insertDoctor = async (username, password, doctorName, contact) => {
    const userId = await this.insertUser(username, password, "doctor", contact);
    const doctorId = (
      await DB.run(sqlQueries.insert_Doctor, [doctorName, userId])
    ).lastID;
    return doctorId;
  };

  insertPharmacy = async (
    username,
    password,
    pharmacyName,
    address,
    contact
  ) => {
    const userId = await this.insertUser(
      username,
      password,
      "pharmacy",
      contact
    );
    const pharmacyId = (
      await DB.run(sqlQueries.insert_Pharmacy, [pharmacyName, address, userId])
    ).lastID;

    return pharmacyId;
  };

  getDoctorId = async (username = "") => {
    const doctorId = await DB.get(sqlQueries.getDoctorIdByUsername, [username]);
    return doctorId.Id;
  };

  getPharmacyId = async (username = "") => {
    const pharmacyId = await DB.get(sqlQueries.getPharmacyIdByUsername, [
      username
    ]);
    return pharmacyId.Id;
  };

  addAccountRequest = async (name, type, phone, email) => {
    await DB.run(sqlQueries.insert_AccountRequest, [name, type, phone, email]);
  };

  getMessagesCategories = async () => {
    return await DB.queryAll(sqlQueries.get_MessagesCategories);
  };

  addMessage = async (userId, category_Id, content) => {
    await DB.run(sqlQueries.insert_Message, [userId, category_Id, content]);
  };
}

module.exports = new Repository();
