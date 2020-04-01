const repository = require("../repositories/admin.repository");
const SendResponse = require("../Utils/SendResponse");

class Controller {
  getNewAccountRequests = async (req, res) => {
    const accountRequests = await repository.getNewAccountRequests();
    SendResponse.JsonData(res, accountRequests);
  };

  getNewMessages = async (req, res) => {
    const newMsgs = await repository.getNewMessages();
    SendResponse.JsonData(res, newMsgs);
  };

  markMessageRead = async (req, res) => {
    const { id } = req.body;
    await repository.markMessageRead(id);
    SendResponse.JsonSuccess(res);
  };

  markAccountRequestRead = async (req, res) => {
    const { id } = req.body;
    await repository.markAccountRequestRead(id);
    SendResponse.JsonSuccess(res);
  };
}

module.exports = new Controller();
