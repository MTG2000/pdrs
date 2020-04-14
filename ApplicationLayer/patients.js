const PatientsDomain = require("../DomainLayer/patients.repository");
const UsersDomain = require("../DomainLayer/users.repository");
const { ErrorHandler } = require("../helpers/error");

class PatientsService {
  // {
  //     patientId:0233913331,
  //     medicins:[
  //         {
  //             id:34,
  //             isChronic:false,
  //             isBold:true
  //         },...
  //     ],
  // classification:"bones",
  // note:"the patient suffer from an injury to his knee"
  // }
  newPrescription = async (
    username,
    patientId,
    patientName,
    medicins,
    classificationId,
    note
  ) => {
    //!!! add validation !!!
    const patientExist = await UsersDomain.getPatient(patientId);
    if (!patientExist) {
      if (patientName.trim().length <= 4)
        throw new ErrorHandler(400, "Patient Name Very Short");
      await UsersDomain.newPatient(patientId, patientName);
    }
    const doctorId = await UsersDomain.getDoctorId(username);
    if (!doctorId || medicins.length === 0 || note.trim().length < 5)
      throw new ErrorHandler(400, "Invalid Data");
    const prescriptionId = await PatientsDomain.newPrescription(
      patientId,
      doctorId,
      classificationId,
      note
    );
    await PatientsDomain.addMedicinsToPrescription(
      prescriptionId,
      medicins.map(m => ({ ...m, id: m.value }))
    );
  };

  getPrescriptions = async (patientId, classification = "") => {
    let chronicMedicins = [];
    let prescriptions = [];
    if (!classification)
      prescriptions = await PatientsDomain.getPatientPrescriptions(patientId);
    else {
      prescriptions = await PatientsDomain.getPatientPrescriptionsByClassification(
        patientId,
        +classification
      );
    }
    for (const prescription of prescriptions) {
      const medicins = await PatientsDomain.getPrescriptionMedicins(
        prescription.Id
      );
      prescription.medicins = medicins;

      chronicMedicins = [
        ...chronicMedicins,
        ...medicins.filter(m => m.IsChronic == true).map(m => m.Name)
      ];
    }

    //remove duplicates
    chronicMedicins = chronicMedicins.filter(
      (m, i) => chronicMedicins.indexOf(m) === i
    );

    return {
      prescriptions: prescriptions.reverse(),
      chronicMedicins
    };
  };

  getPrescriptionsToDispense = async patientId => {
    let chronicMedicins = [];
    let prescriptions = await PatientsDomain.getPatientPrescriptionsToDispense(
      patientId
    );

    for (const prescription of prescriptions) {
      const medicins = await PatientsDomain.getPrescriptionMedicinsToDispense(
        prescription.Id
      );
      prescription.medicins = medicins;
      chronicMedicins = [
        ...chronicMedicins,
        ...medicins.filter(m => m.isChronic == true)
      ];
    }

    //remove duplicates
    chronicMedicins = chronicMedicins.filter(
      (m, i) => chronicMedicins.indexOf(m) === i
    );

    return {
      prescriptions: prescriptions.reverse(),
      chronicMedicins
    };
  };

  // const reqBody = {
  //   patientId: "021233123",
  //   prescriptionId: 4,
  //   medicins: [1, 2]
  // };
  dispenseMedicins = async (prescriptionId, medicins, username) => {
    const pharmacyId = await UsersDomain.getPharmacyId(username);
    await PatientsDomain.dispenseMedicins(prescriptionId, medicins, pharmacyId);
  };

  stopChronicMedicine = async (prescriptionId, medicineId) => {
    await PatientsDomain.stopChronicMedicine(prescriptionId, medicineId);
  };
}

module.exports = new PatientsService();