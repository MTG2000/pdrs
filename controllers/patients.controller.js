const patientsRepository = require("../repositories/patients.repository");
const usersRepository = require("../repositories/users.repository");
const SendResponse = require("../Utils/SendResponse");

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
const newPrescription = async (req, res, next) => {
  try {
    const {
      patientId,
      patientName,
      medicins,
      classificationId,
      note
    } = req.body;
    //!!! add validation !!!
    const patientExist = await usersRepository.getPatient(patientId);
    if (!patientExist) {
      if (patientName.trim().length <= 4) throw Error();
      await usersRepository.newPatient(patientId, patientName);
    }
    const doctorId = await usersRepository.getDoctorId(req.user.username);
    if (!doctorId || medicins.length === 0 || note.trim().length < 5)
      return SendResponse.JsonFailed(
        res,
        "Data Incorrect, please provide valid data"
      );
    const prescriptionId = await patientsRepository.newPrescription(
      patientId,
      doctorId,
      classificationId,
      note
    );
    await patientsRepository.addMedicinsToPrescription(
      prescriptionId,
      medicins.map(m => ({ ...m, id: m.value }))
    );
    SendResponse.JsonCreated(
      res,
      "Success",
      "Presecription Created Successfully"
    );
  } catch (error) {
    res.failed = true;
    SendResponse.JsonFailed(
      res,
      "Something Wrong happened while creating prescription"
    );
  }
  next();
};

const getPrescriptions = async (req, res) => {
  const patientId = req.query.patientId;
  const classification = req.query.classification || "";
  let chronicMedicins = [];
  let prescriptions = [];
  if (!classification)
    prescriptions = await patientsRepository.getPatientPrescriptions(patientId);
  else {
    prescriptions = await patientsRepository.getPatientPrescriptionsByClassification(
      patientId,
      +classification
    );
  }
  for (const prescription of prescriptions) {
    const medicins = await patientsRepository.getPrescriptionMedicins(
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

  SendResponse.JsonData(res, {
    prescriptions: prescriptions.reverse(),
    chronicMedicins
  });
};

const getPrescriptionsToDispense = async (req, res) => {
  const patientId = req.query.patientId;
  let chronicMedicins = [];
  let prescriptions = [];
  let allPrescriptions = await patientsRepository.getPatientPrescriptions(
    patientId
  );

  for (const prescription of allPrescriptions) {
    const medicins = await patientsRepository.getPrescriptionMedicinsToDispense(
      prescription.Id
    );
    if (medicins.length > 0) {
      prescriptions.push(prescription);
      prescriptions[prescriptions.length - 1].medicins = medicins;
    }
    chronicMedicins = [
      ...chronicMedicins,
      ...medicins.filter(m => m.isChronic == true)
    ];
  }

  //remove duplicates
  chronicMedicins = chronicMedicins.filter(
    (m, i) => chronicMedicins.indexOf(m) === i
  );

  SendResponse.JsonData(res, {
    prescriptions: prescriptions.reverse(),
    chronicMedicins
  });
};

// const reqBody = {
//   patientId: "021233123",
//   prescriptionId: 4,
//   medicins: [1, 2]
// };
const dispenseMedicins = async (req, res, next) => {
  try {
    const { prescriptionId, medicins } = req.body;
    const pharmacyId = await usersRepository.getPharmacyId(req.user.username);
    for (const med of medicins) {
      await patientsRepository.dispenseMedicine(
        prescriptionId,
        med,
        pharmacyId
      );
    }
    SendResponse.JsonSuccess(res);
  } catch (error) {
    res.failed = true;
    SendResponse.JsonFailed(res, "Couldn't dispense medicins");
  }
  next();
};

const stopChronicMedicine = async (req, res, next) => {
  try {
    const { prescriptionId, medicineId } = req.body;
    await patientsRepository.stopChronicMedicine(prescriptionId, medicineId);
    SendResponse.JsonSuccess(res);
  } catch (error) {
    res.failed = true;
    SendResponse.JsonFailed(res);
  }
  next();
};

module.exports = {
  newPrescription,
  getPrescriptions,
  getPrescriptionsToDispense,
  dispenseMedicins,
  stopChronicMedicine
};
