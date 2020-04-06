const jwt = require("jsonwebtoken");
//import jwt from 'jsonwebtoken';

const generateToken = dataToInclude => {
  const token = jwt.sign({ ...dataToInclude }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
  return token;
  //   return res.cookie('token', token, {
  //     expires: new Date(Date.now() + expiration),
  //     secure: false, // set to true if your using https
  //     httpOnly: true,
  //   });
};

const validateToken = async token => {
  if (!token) return null;

  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      console.log(err);

      return null;
    }
    return data;
  });
  return true;
};
module.exports = { generateToken, validateToken };
