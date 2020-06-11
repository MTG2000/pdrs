const ApiError = require("../helpers/error");

// Here we can handle all errors
module.exports = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json({ title: err.title, message: err.message });
  }

  return res.status(400).json({
    title: "Invalid Data",
    message: "Please try again",
  });
};
