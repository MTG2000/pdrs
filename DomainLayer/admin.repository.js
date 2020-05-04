const DB = require("../services/db").DB;
const sqlQueries = require("../db/sql-queries");
const usersRepository = require("./users.repository");

class Repository {
  getNewAccountRequests = async () => {
    return (await DB.queryAll(sqlQueries.getNewAccountRequests)).reverse();
  };

  getNewMessages = async () => {
    //get all messages
    let newMsgs = await DB.queryAll(sqlQueries.getNewMessages);

    let msgsDTO = [];
    for (let msg of newMsgs) {
      const userName = await usersRepository.getUserRealName(msg.User_Id);
      msgsDTO.push({ ...msg, ...userName });
    }

    return msgsDTO.reverse();
  };

  markMessageRead = async (id) => {
    await DB.run(sqlQueries.markMessageRead, [id]);
  };

  markAccountRequestRead = async (id) => {
    await DB.run(sqlQueries.markAccountRequestRead, [id]);
  };

  getAllPrescriptionsAfter = async (date) => {
    return await DB.queryAll(sqlQueries.getPrescriptionsAfterDate, [date]);
  };

  getPrescriptionsPerClassificationCount = async (from, to) => {
    return await DB.queryAll(
      sqlQueries.getPrescriptionsPerClassificationCount,
      [from, to]
    );
  };

  getMedicinsUsageCount = async (from, to, limit = 10) => {
    return await DB.queryAll(sqlQueries.getMedicinsUsage, [from, to, limit]);
  };
}

module.exports = new Repository();
