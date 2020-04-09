const authService = require("../services/auth");
const userRepository = require("../repositories/users.repository");

const isAuth = (allowedRoles = []) => {
  return async (req, res, next) => {
    const accessToken = req.cookies.accessToken || "";

    try {
      if (!accessToken) {
        return res.status(401).json("You need to Login");
      }
      // console.log(accessToken);

      const result = await authService.validateToken(accessToken);
      // console.log(result);

      if (!result.valid) throw Error("invalid Token");

      if (result.expired) {
        const refreshToken = req.cookies.refreshToken;
        const isValid = await userRepository.refreshTokenValid(
          refreshToken,
          result.data.username
        );
        if (!isValid) throw Error("User Not Authenticated");
        const accessToken = await authService.generateAccessToken({
          username: result.data.username,
          role: result.data.role
        });
        res.cookie("accessToken", accessToken, {
          secure: false, // set to true if your using https
          httpOnly: true
        });
      }
      // const isActive = await checkUesrActive(result.data.username);

      if (
        allowedRoles.length > 0 &&
        allowedRoles.filter(r => r === result.data.role).length === 0
      )
        return res.status(403).json("You are not authorized");

      //set user
      req.user = { ...result.data };
      next();
    } catch (err) {
      return res.status(403).json(err.toString());
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
