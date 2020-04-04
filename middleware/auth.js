const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/users.repository");

const isAuth = (allowedRoles = []) => {
  return async (req, res, next) => {
    const token = req.cookies.token || "";
    try {
      if (!token) {
        return res.status(401).json("You need to Login");
      }

      const userData = await jwt.verify(token, process.env.JWT_SECRET);
      const isActive = await checkUesrActive(userData.username);
      if (
        (allowedRoles.length > 0 &&
          allowedRoles.filter(r => r === userData.role).length === 0) ||
        !isActive
      )
        return res.status(403).json("You are not authorized");
      req.user = { ...userData };

      next();
    } catch (err) {
      return res.status(500).json(err.toString());
    }
  };
};

const checkUesrActive = async username => {
  if (!username) return false;
  const isActive = (await userRepository.getUserByUsername(username)).IsActive;
  if (!isActive) return false;
  return true;
};

module.exports = isAuth;
