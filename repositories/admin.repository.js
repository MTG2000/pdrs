const DB = require("../services/db").DB;
const sqlQueries = require("../db/sql-queries");

class Repository {
  getNewAccountRequests = async () => {
    return await DB.queryAll(sqlQueries.getNewAccountRequests);
  };

  getNewMessages = async () => {
    //get all messages
    let newMsgs = await DB.queryAll(sqlQueries.getNewMessages);
    //Add the name of the message sender by looking his type first then looking up his name in the appropriate table
    const DoctorTypeId = await DB.get(sqlQueries.getUserTypeId, ["Doctor"]);
    for (const msg of newMsgs) {
      if (msg.UserType_Id === DoctorTypeId.Id)
        msg.DoctorName = (
          await DB.get(sqlQueries.getDoctorById, [msg.User_Id])
        ).Name;
      else if (msg.UserType_Id === DoctorTypeId.Id) {
        msg.PharmacyName = (
          await DB.get(sqlQueries.getPharmacyById, [msg.User_Id])
        ).Name;
      }
    }

    return newMsgs;
  };

  markMessageRead = async id => {
    await DB.run(sqlQueries.markMessageRead, [id]);
  };

  markAccountRequestRead = async id => {
    await DB.run(sqlQueries.markAccountRequestRead, [id]);
  };
}

module.exports = new Repository();
