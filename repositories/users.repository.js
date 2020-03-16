const DB = require("../services/db").DB;
const sqlQueries = require("../db/sql-queries");

const getUser = async (username, password) => {
  try {
    return await DB.get(sqlQueries.getUser, [username, password]);
  } catch (error) {
    console.log(error);
  }
};
const getPatients = async (id = "") => {
  try {
    return await DB.queryAll(sqlQueries.getPatientsById, [`${id}%`]);
  } catch (error) {
    console.log(error);
  }
};

const newPatient = async (id, name) => {
  try {
    return await DB.run(sqlQueries.insert_Patient, [id, name]);
  } catch (error) {
    console.log(error);
  }
};

const getUserTypeId = async name => {
  return (await DB.get(sqlQueries.getUserTypeId, [name])).ID;
};
const getUserTypeById = async id => {
  return (await DB.get(sqlQueries.getUserTypeById, [id])).TYPE;
};

const insertUser = async (username, password, type = "pharmacy") => {
  const userTypeId = await getUserTypeId(type);
  return (
    await DB.run(sqlQueries.insert_User, [userTypeId, username, password])
  ).lastID;
};

const insertDoctor = async (username, password, doctorName) => {
  try {
    const userId = await insertUser(username, password, "doctor");
    const doctorId = (
      await DB.run(sqlQueries.insert_Doctor, [doctorName, userId])
    ).lastID;
    return doctorId;
  } catch (error) {
    console.log(error);
  }
};

const insertPharmacy = async (username, password, pharmacyName, address) => {
  try {
    const userId = await insertUser(username, password, "pharmacy");
    const pharmacyId = (
      await DB.run(sqlQueries.insert_Pharmacy, [pharmacyName, address, userId])
    ).lastID;

    return pharmacyId;
  } catch (error) {
    console.log(error);
  }
};

const getDoctorId = async (username = "") => {
  try {
    const doctorId = await DB.get(sqlQueries.getDoctorIdByUsername, [username]);
    return doctorId.ID;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPatients,
  getUser,
  getDoctorId,
  insertPharmacy,
  insertDoctor,
  newPatient,
  getUserTypeById
};
