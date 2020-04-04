const userRepository = require("../repositories/users.repository");

const isActive = () => {
  return async (req, res, next) => {
    const username = req.user;
    console.log(username);
    if (!username) return res.status(401).json("You are not Authorized");
    const isActive = (await userRepository.getUserByUsername(username))
      .IsActive;
    console.log(isActive);
    if (!isActive)
      return res.status(403).json("Your account has been suspended");
    next();
  };
};

module.exports = isActive;
