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
  const patientExist = await patientsRepository.getPatient(patientId);
  if (!patientExist) {
    await patientsRepository.newPatient(patientId, patientName);
  }
  const doctorId = await usersRepository.getDoctorId(req.user.username);
  if (!doctorId) res.status(400).send("Incorrect Data");
  const prescriptionId = await medicinsRepository.newPrescription(
    patientId,
    doctorId,
    classificationId,
    note
  );
  const result = await medicinsRepository.addMedicinsToPrescription(
    prescriptionId,
    medicins
  );
  res.send({ success: result });
};

const getPrescriptions = async (req, res) => {
  const patientId = req.params.id;
  const classification = req.params.classification || "";
  const chronicMedicins = [];
  const prescriptions = await medicinsRepository.getPatientPrescriptions(
    patientId,
    classification
  );
  prescriptions.forEach(async prescription => {
    const medicins = await medicinsRepository.getPrescriptionMedicins(
      prescription.id
    );
    prescription.medicins = medicins;
    chronicMedicins = [
      ...medicins.filter(m => m.isChronic),
      ...chronicMedicins
    ];
  });

  res.send({
    prescriptions,
    chronicMedicins
  });
};

module.exports = { newPrescription, getPrescriptions };
