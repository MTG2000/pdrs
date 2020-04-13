const DB = require("../services/db").DB;
const sqlQueries = require("../db/sql-queries");

const newPrescription = async (patientId, doctorId, classification, note) => {
  return (
    await DB.run(sqlQueries.insert_Prescription, [
      doctorId,
      patientId,
      classification,
      note
    ])
  ).lastID;
};

const addMedicinsToPrescription = async (prescriptionId, medicins) => {
  for (const m of medicins) {
    await DB.run(sqlQueries.insert_MedicinePrescription, [
      m.id,
      prescriptionId,
      m.isBold || "0",
      m.isChronic || "0"
    ]);
  }
};

async function getPatientPrescriptions(patientId) {
  return await DB.queryAll(sqlQueries.getPatientPrescriptions, [patientId]);
}

async function getPatientPrescriptionsToDispense(patientId) {
  return await DB.queryAll(sqlQueries.getPatientPrescriptionsToDispense, [
    patientId
  ]);
}

async function getPatientPrescriptionsByClassification(
  patientId,
  classification
) {
  return await DB.queryAll(sqlQueries.getPatientPrescriptionsByClassification, [
    patientId,
    classification
  ]);
}

const getPrescriptionMedicins = async prescriptionId => {
  return await DB.queryAll(sqlQueries.getPrescriptionMedicins, [
    prescriptionId
  ]);
};

const getPrescriptionMedicinsToDispense = async prescriptionId => {
  return await DB.queryAll(sqlQueries.getPrescriptionMedicinsToDispense, [
    prescriptionId
  ]);
};

const dispenseMedicins = async (prescriptionId, medicins, pharmacyId) => {
  if (!Array.isArray(medicins) || medicins.some(m => typeof m !== "number"))
    throw Error("Invalid Medicins Ids");

  await DB.run(sqlQueries.dispenseMedicins + `(${medicins.join(",")})`, [
    pharmacyId,
    prescriptionId
  ]);

  if (
    (await DB.queryAll(sqlQueries.getPrescriptionMedicinsToDispense)).length ===
    0
  ) {
    await DB.run(sqlQueries.setPrescriptionDispensed, [prescriptionId]);
  }
};

const stopChronicMedicine = async (prescriptionId, medicineId) => {
  return await DB.run(sqlQueries.stopChronincMedicine, [
    medicineId,
    prescriptionId
  ]);
};

module.exports = {
  newPrescription,
  addMedicinsToPrescription,
  getPatientPrescriptions,
  getPrescriptionMedicins,
  getPrescriptionMedicinsToDispense,
  getPatientPrescriptionsByClassification,
  dispenseMedicins,
  stopChronicMedicine,
  getPatientPrescriptionsToDispense
};
