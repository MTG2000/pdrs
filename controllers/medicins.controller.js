const Response = require("../helpers/response");
const MedicinsService = require("../ApplicationLayer/medicins");

class Controller {
  getMedicins = async (req, res) => {
    try {
      const { name = "" } = req.query;
      const medicins = await MedicinsService.getMedicins(name);
      res.send(new Response.Data(medicins));
    } catch (error) {
      next(error);
    }
  };

  getClassifications = async (req, res) => {
    try {
      const classifications = await MedicinsService.getClassifications();
      res.send(new Response.Data(classifications));
    } catch (error) {
      next(error);
    }
  };

  newMedicine = async (req, res, next) => {
    try {
      const { name } = req.body;
      await MedicinsService.newMedicine(name);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new Controller();
