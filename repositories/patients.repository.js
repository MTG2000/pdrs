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
  return true;
};

async function getPatientPrescriptions(patientId) {
  return await DB.queryAll(sqlQueries.getPatientPrescriptions, [patientId]);
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

const dispenseMedicine = async (prescriptionId, medicineId, pharmacyId) => {
  return await DB.queryAll(sqlQueries.dispenseMedicine, [
    pharmacyId,
    medicineId,
    prescriptionId
  ]);
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
  getPatientPrescriptionsByClassification,
  dispenseMedicine,
  stopChronicMedicine
};
