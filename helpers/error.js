const { ErrorResponse } = require("./response");

class ErrorHandler extends Error {
  constructor(
    statusCode,
    title = "Something Wrong happened",
    message = "please try again "
  ) {
    super();
    this.statusCode = statusCode;
    this.response = new ErrorResponse(statusCode, title, message);
  }

  sendErrorResponse(res) {
    res.status(this.statusCode).json(this.response);
  }
}

const handleError = (err, res) => {
  //Send A response back to the client
  res
    .status(err.statusCode || 400)
    .json(err.response || { title: "Something Wrong Happened" });
  //Log the error
  console.log(err);
};

module.exports = {
  ErrorHandler,
  handleError,
};
