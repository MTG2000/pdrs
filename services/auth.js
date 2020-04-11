const jwt = require("jsonwebtoken");

const generateAccessToken = dataToInclude => {
  return new Promise((res, rej) => {
    jwt.sign(
      { ...dataToInclude },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m"
      },
      (err, token) => {
        if (err) rej(err);
        res(token);
      }
    );
  });
};

const generateRefreshToken = username => {
  return new Promise((res, rej) => {
    jwt.sign(
      { username },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d"
      },
      (err, token) => {
        if (err) rej(err);
        res(token);
      }
    );
  });
};

const validateToken = token => {
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
