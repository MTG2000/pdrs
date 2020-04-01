const DB = require("../services/db").DB;
const sqlQueries = require("../db/sql-queries");

class Repository {
  getUser = async username => {
    return await DB.get(sqlQueries.getUser, [username]);
  };

  getAllUsers = async () => {
    let users = await DB.queryAll(sqlQueries.getAllUsers);
    //Add the actual name of the user  by looking his type first then looking up his name in the appropriate table
    const DoctorTypeId = await DB.get(sqlQueries.getUserTypeId, ["Doctor"]);
    const PharmacyTypeId = await DB.get(sqlQueries.getUserTypeId, ["Pharmacy"]);
    for (const user of users) {
      if (user.UserType_Id === DoctorTypeId.Id)
        user.DoctorName = (
          await DB.get(sqlQueries.getDoctorById, [user.Id])
        ).Name;
      else if (user.UserType_Id === PharmacyTypeId.Id) {
        user.PharmacyName = (
          await DB.get(sqlQueries.getPharmacyById, [user.Id])
        ).Name;
      }
    }
    return users;
  };

  getPatient = async (id = "") => {
    return await DB.get(sqlQueries.getPatientById, [id]);
  };
  newPatient = async (id, name) => {
    return await DB.run(sqlQueries.insert_Patient, [id, name]);
  };

  getUserTypeId = async name => {
    return (await DB.get(sqlQueries.getUserTypeId, [name])).Id;
  };
  getUserTypeById = async id => {
    return (await DB.get(sqlQueries.getUserTypeById, [id])).Type;
  };

  insertUser = async (username, password, type = "pharmacy") => {
    const userTypeId = await getUserTypeId(type);
    return (
      await DB.run(sqlQueries.insert_User, [userTypeId, username, password])
    ).lastID;
  };

  insertDoctor = async (username, password, doctorName) => {
    const userId = await insertUser(username, password, "doctor");
    const doctorId = (
      await DB.run(sqlQueries.insert_Doctor, [doctorName, userId])
    ).lastID;
    return doctorId;
  };

  insertPharmacy = async (username, password, pharmacyName, address) => {
    const userId = await insertUser(username, password, "pharmacy");
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
}

module.exports = new Repository();
