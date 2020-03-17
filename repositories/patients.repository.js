const DB = require("../services/db").DB;
const sqlQueries = require("../db/sql-queries");

const getPatient = async (id = "") => {
  try {
    return await DB.all(`SELECT ID,NAME from patients where ID = ? `, [
      `${id}%`
    ]);
  } catch (error) {
    console.log(error);
  }
};

const getAllPatient = async (id = "") => {
  try {
    return await DB.all(`SELECT ID,NAME from patients where ID Like ? `, [
      `${id}%`
    ]);
  } catch (error) {
    console.log(error);
  }
};

const newPrescription = async (patientId, doctorId, classification, note) => {
  try {
    return (
      await DB.run(sqlQueries.insert_Prescription, [
        doctorId,
        patientId,
        classification,
        note
      ])
    ).lastID;
  } catch (error) {
    console.log(error);
  }
};

const addMedicinsToPrescription = async (prescriptionId, medicins) => {
  try {
    for (const m of medicins) {
      await DB.run(sqlQueries.insert_MedicinePrescription, [
        m.id,
        prescriptionId,
        m.isBold,
        m.isChronic
      ]);
    }
    return true;
  } catch (error) {
    console.log(error);
  }
};

async function getPatientPrescriptions(patientId) {
  try {
    console.log(patientId);
    return await DB.queryAll(sqlQueries.getPatientPrescriptions, [patientId]);
  } catch (error) {
    console.log(error);
  }
}

async function getPatientPrescriptionsByClassification(
  patientId,
  classification
) {
  try {
    return await DB.queryAll(
      sqlQueries.getPatientPrescriptionsByClassification,
      [patientId, classification]
    );
  } catch (error) {
    console.log(error);
  }
}

const getPrescriptionMedicins = async prescriptionId => {
  try {
    return await DB.queryAll(sqlQueries.getPrescriptionMedicins, [
      prescriptionId
    ]);
  } catch (error) {
    console.log(error);
  }
};

const dispenseMedicine = async (prescriptionId, medicineId, pharmacyId) => {
  try {
    return await DB.queryAll(sqlQueries.dispenseMedicine, [
      pharmacyId,
      medicineId,
      prescriptionId
    ]);
  } catch (error) {
    console.log(error);
  }
};

const stopChronicMedicine = async (prescriptionId, medicineId) => {
  try {
    return await DB.run(sqlQueries.stopChronincMedicine, [
      medicineId,
      prescriptionId
    ]);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPatient,
  getAllPatient,
  newPrescription,
  addMedicinsToPrescription,
  getPatientPrescriptions,
  getPrescriptionMedicins,
  getPatientPrescriptionsByClassification,
  dispenseMedicine,
  stopChronicMedicine
};
