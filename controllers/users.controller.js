const repository = require("../repositories/users.repository");

const getUsers = async (req, res) => {
  const users = await repository.getUsers();
  res.send(users);
};

module.exports = { getUsers };
