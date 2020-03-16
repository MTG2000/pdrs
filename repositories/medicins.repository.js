(async () => {
  db = await require("../services/db").getDB();
})();

const getMedicins = async medicineName => {
  try {
    return await db.all(`select * from Medicins where name like ? `, [
      `${medicineName}%`
    ]);
  } catch (error) {
    console.log(error);
  }
};

const getClassifications = async () => {
  try {
    return await db.all(`select * from Classifications`);
  } catch (error) {
    console.log(error);
  }
};

const newPrescription = async (patientId, doctorId, classification, note) => {
  try {
    return await db.run(`create new prescription `, [
      patientId,
      doctorId,
      classification,
      note
    ]);
  } catch (error) {
    console.log(error);
  }
};

const addMedicinsToPrescription = async (prescriptionId, medicins) => {
  try {
    // const normalMedicins = medicins.filter(m => !m.isChronic);
    // const chronicMedicins = medicins.filter(m => m.isChronic);
    await db.run(`insert into prescription_medicin  `, [`${name}%`]);
    // await db.run(`insert into chronic_medicin  `, [`${name}%`]);
  } catch (error) {
    console.log(error);
  }
};

const getClassificationId = async (name = "") => {
  try {
    return await db.all(`SELECT ID from classification where name = ? `, [
      `${name}%`
    ]);
  } catch (error) {
    console.log(error);
  }
};

const getPatientPrescriptions = async (id, classification = 0) => {
  try {
    if (!classification)
      return await db.all(
        `SELECT ID,doctorId,pharmacyId,classification,note from prescriptions where patientId = ? `,
        [id]
      );
    return await db.all(
      `SELECT ID from prescriptions where patientId = ? and classificationId = ?`,
      [id, classification]
    );
  } catch (error) {
    console.log(error);
  }
};

const getPrescriptionMedicins = async id => {
  try {
    return await db.all(
      `SELECT ID,isBold,isChronic from prescriptions_medicins where prescriptionId = ? `,
      [id]
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  newPrescription,
  getClassificationId,
  addMedicinsToPrescription,
  getPatientPrescriptions,
  getPrescriptionMedicins,
  getMedicins,
  getClassifications
};
