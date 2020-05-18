const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const generateAccessToken = async (dataToInclude) => {
  //You can also use normal promises if you want
  return await promisify(jwt.sign)(
    { ...dataToInclude },
    process.env.JWT_SECRET,
    {
      expiresIn: "60m",
    }
  );
};

const generateRefreshToken = async (username) => {
  return await promisify(jwt.sign)({ username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const validateToken = async (token) => {
  return new Promise((res, rej) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          const data = jwt.decode(token);
          res({ valid: true, expired: true, data });
        }
        rej({ valid: false });
      }

      res({ valid: true, data: decoded });
    });
  });
};
module.exports = { generateAccessToken, validateToken, generateRefreshToken };
