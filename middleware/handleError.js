const { handleError, ErrorHandler } = require("../helpers/error");

module.exports = (err, req, res, next) => {
  console.log(err);

  if (!err.statusCode)
    return handleError(
      new ErrorHandler(400, "Invalid Data", "Please try again"),
      res
    );

  handleError(err, res);
};
