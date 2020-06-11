const PatientsService = require("../ApplicationLayer/patients");
const Response = require("../helpers/response");
const ApiError = require("../helpers/error");

class Controller {
  //   {
  //     "patientId":"0233913331",
  //     "patientName":"A Name",
  //      "medicins":[
  //          {
  //              "value":10,
  //              "isChronic":"false",
  //              "isBold":"true"
  //          }
  //      ],
  //  "conditionId":"12",
  //  "note":"the patient suffer from an injury to his knee"
  //   }
  newPrescription = async (req, res, next) => {
    try {
      const { patientId, patientName, medicins, conditionId, note } = req.body;

      await PatientsService.newPrescription(
        req.user.username,
        patientId,
        patientName,
        medicins,
        conditionId,
        note
      );

      res
        .status(201)
        .send(
          new Response.Success("Created", "Presecription Created Successfully")
        );
      next();
    } catch (error) {
      next(error);
    }
  };

  getPrescriptions = async (req, res) => {
    try {
      const patientId = req.query.patientId;
      const classification = req.query.classification || "";
      const result = await PatientsService.getPrescriptions(
        patientId,
        classification
      );

      res.send(
        new Response.Data({
          prescriptions: result.prescriptions,
          chronicMedicins: result.chronicMedicins,
        })
      );
    } catch (error) {
      next(error);
    }
  };

  getPrescriptionsToDispense = async (req, res) => {
    try {
      const patientId = req.query.patientId;

      const result = await PatientsService.getPrescriptionsToDispense(
        patientId
      );
      res.send(
        new Response.Data({
          prescriptions: result.prescriptions,
          chronicMedicins: result.chronicMedicins,
        })
      );
    } catch (error) {
      next(error);
    }
  };

  // const reqBody = {
  //   patientId: "021233123",
  //   prescriptionId: 4,
  //   medicins: [1, 2]
  // };
  dispenseMedicins = async (req, res, next) => {
    try {
      const { prescriptionId, medicins } = req.body;
      await PatientsService.dispenseMedicins(
        prescriptionId,
        medicins,
        req.user.username
      );

      res.send(
        new Response.Success("Success", "Medicins Dispenesed Successfully")
      );
      next();
    } catch (error) {
      next(error);
    }
  };

  stopChronicMedicine = async (req, res, next) => {
    try {
      const { prescriptionId, medicineId } = req.body;

      await PatientsService.stopChronicMedicine(prescriptionId, medicineId);
      res.send(new Response.Success());
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new Controller();
