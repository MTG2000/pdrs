(async () => {
  db = await require("../services/db").getDb();
})();

const getUsers = async (id = "") => {
  try {
    return await db.all(`SELECT ID,NAME from patients where ID Like ? `, [
      `${id}%`
    ]);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUsers };
