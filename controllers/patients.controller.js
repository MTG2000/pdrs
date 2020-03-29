const patientsRepository = require("../repositories/patients.repository");
const usersRepository = require("../repositories/users.repository");

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
    const patientExist = await usersRepository.getPatients(patientId);
    if (!patientExist[0]) {
      await usersRepository.newPatient(patientId, patientName);
    }
    const doctorId = await usersRepository.getDoctorId(req.user.username);
    if (!doctorId) throw Error("Doctor Not Correct");
    const prescriptionId = await patientsRepository.newPrescription(
      patientId,
      doctorId,
      classificationId,
      note
    );
    const result = await patientsRepository.addMedicinsToPrescription(
      prescriptionId,
      medicins
    );
    res.status(201).send({ success: result });
  } catch (error) {
    console.error(error);
    res.failed = true;
    res.status(400).json({ error: error });
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
      ...medicins.filter(m => m.isChronic == true)
    ];
  }

  res.json({
    prescriptions,
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
    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.failed = true;
    res.status(400).json({ error: error });
  }
  next();
};

const stopChronicMedicine = async (req, res, next) => {
  try {
    const { prescriptionId, medicineId } = req.body;
    await patientsRepository.stopChronicMedicine(prescriptionId, medicineId);
    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.failed = true;
    res.status(400).json({ error: error });
  }
  next();
};

module.exports = {
  newPrescription,
  getPrescriptions,
  dispenseMedicins,
  stopChronicMedicine
};
