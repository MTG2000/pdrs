const patientsRepository = require("../repositories/patients.repository");
const medicinsRepository = require("../repositories/medicins.repository");
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
const newPrescription = async (req, res) => {
  const { patientId, patientName, medicins, classificationId, note } = req.body;
  //!!! add validation !!!
  const patientExist = await usersRepository.getPatients(patientId);
  if (!patientExist) {
    await usersRepository.newPatient(patientId, patientName);
  }
  const doctorId = await usersRepository.getDoctorId(req.user.username);
  console.log(doctorId);
  if (!doctorId) return res.status(400).send("Incorrect Data");
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
  res.send({ success: result });
};

const getPrescriptions = async (req, res) => {
  const patientId = req.query.patientId;
  const classification = req.params.classification || "";
  let chronicMedicins = [];
  let prescriptions = [];
  if (!classification)
    prescriptions = await patientsRepository.getPatientPrescriptions(patientId);
  else
    prescriptions = await patientsRepository.getPatientPrescriptions(
      patientId,
      classification
    );

  for (const prescription of prescriptions) {
    const medicins = await patientsRepository.getPrescriptionMedicins(
      prescription.ID
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

module.exports = { newPrescription, getPrescriptions };
