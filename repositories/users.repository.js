const DB = require("../services/db").DB;
const sqlQueries = require("../db/sql-queries");

const getUser = async (username, password) => {
  return await DB.get(sqlQueries.getUser, [username, password]);
};
const getPatients = async (id = "") => {
  return await DB.queryAll(sqlQueries.getPatientsById, [`${id}%`]);
};

const newPatient = async (id, name) => {
  return await DB.run(sqlQueries.insert_Patient, [id, name]);
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
  const userId = await insertUser(username, password, "doctor");
  const doctorId = (
    await DB.run(sqlQueries.insert_Doctor, [doctorName, userId])
  ).lastID;
  return doctorId;
};

const insertPharmacy = async (username, password, pharmacyName, address) => {
  const userId = await insertUser(username, password, "pharmacy");
  const pharmacyId = (
    await DB.run(sqlQueries.insert_Pharmacy, [pharmacyName, address, userId])
  ).lastID;

  return pharmacyId;
};

const getDoctorId = async (username = "") => {
  const doctorId = await DB.get(sqlQueries.getDoctorIdByUsername, [username]);
  return doctorId.ID;
};

const getPharmacyId = async (username = "") => {
  const pharmacyId = await DB.get(sqlQueries.getPharmacyIdByUsername, [
    username
  ]);
  return pharmacyId.ID;
};

module.exports = {
  getPatients,
  getUser,
  getDoctorId,
  insertPharmacy,
  insertDoctor,
  newPatient,
  getUserTypeById,
  getPharmacyId
};
