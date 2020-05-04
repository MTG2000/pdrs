const Response = require("../helpers/response");
const AdminService = require("../ApplicationLayer/admin");

class Controller {
  getNewAccountRequests = async (req, res, next) => {
    try {
      const accountRequests = await AdminService.getNewAccountRequests();
      res.send(new Response.Data(accountRequests));
    } catch (error) {
      next(error);
    }
  };

  getNewMessages = async (req, res, next) => {
    try {
      const newMsgs = await AdminService.getNewMessages();
      res.send(new Response.Data(newMsgs));
    } catch (error) {
      next(error);
    }
  };

  markMessageRead = async (req, res, next) => {
    try {
      const { id } = req.body;
      await AdminService.markMessageRead(id);
      res.send(new Response.Success());
    } catch (error) {
      next(error);
    }
  };

  markAccountRequestRead = async (req, res, next) => {
    try {
      const { id } = req.body;
      await AdminService.markAccountRequestRead(id);
      res.send(new Response.Success());
    } catch (error) {
      next(error);
    }
  };

  getPrescriptionsUsage = async (req, res, next) => {
    try {
      const result = await AdminService.getPrescriptionsUsage();
      res.send(new Response.Data(result));
    } catch (error) {
      next(error);
    }
  };

  getPrescriptionsPerClassificationCount = async (req, res, next) => {
    try {
      const { from, to } = req.query;
      const result = await AdminService.getPrescriptionsPerClassificationCount(
        from,
        to
      );
      res.send(new Response.Data(result));
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new Controller();
