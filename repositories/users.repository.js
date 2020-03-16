const db = require("../services/db").DB;

const getPatients = async (id = "") => {
  try {
    return await db.queryAll(`SELECT ID,NAME from patients where ID Like ? `, [
      `${id}%`
    ]);
  } catch (error) {
    console.log(error);
  }
};

const insertDoctor = async (username, password, doctorName) => {
  try {
    const userId = await db.run(`insert into table users values `, [
      username,
      password
    ]);
    const doctorId = await db.run(`insert into table doctor`, [
      doctorName,
      userId
    ]);
    return doctorId;
  } catch (error) {
    console.log(error);
  }
};

const insertPharmacy = async (username, password, pharmacyName, address) => {
  try {
    const userId = await db.run(`insert into table users values `, [
      username,
      password
    ]);
    const pharmacyId = await db.run(`insert into table pharmacy`, [
      pharmacyName,
      address,
      userId
    ]);
    return pharmacyId;
  } catch (error) {
    console.log(error);
  }
};

const getDoctorId = async (username = "") => {
  try {
    const userId = await db.all(`SELECT ID from users where username = ? `, [
      username
    ]);

    const doctorId = await db.get(`select ID from doctors where userId = ?`, [
      userId
    ]);
    return doctorId;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getPatients, getDoctorId, insertPharmacy, insertDoctor };
