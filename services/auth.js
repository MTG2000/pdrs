const jwt = require("jsonwebtoken");
//import jwt from 'jsonwebtoken';

const generateAccessToken = dataToInclude => {
  const token = jwt.sign({ ...dataToInclude }, process.env.JWT_SECRET, {
    expiresIn: "15m"
  });
  return token;
};

const generateRefreshToken = username => {
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
  return token;
};

const validateToken = async token => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { valid: true, data: decoded };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const data = jwt.decode(token);
      return { valid: true, expired: true, data };
    }
    return { valid: false };
  }
};
module.exports = { generateAccessToken, validateToken, generateRefreshToken };
