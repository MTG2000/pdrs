(async () => {
  db = await require("../services/db").getDB();
})();

const getPatient = async (id = "") => {
  try {
    return await db.all(`SELECT ID,NAME from patients where ID = ? `, [
      `${id}%`
    ]);
  } catch (error) {
    console.log(error);
  }
};

const newPatient = async (id, name) => {
  try {
    return await db.run(`insert into patients values `, [id, name]);
  } catch (error) {
    console.log(error);
  }
};

const getAllPatient = async (id = "") => {
  try {
    return await db.all(`SELECT ID,NAME from patients where ID Like ? `, [
      `${id}%`
    ]);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getPatient, getAllPatient, newPatient };
