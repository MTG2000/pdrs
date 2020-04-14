const { handleError } = require("../helpers/error");

module.exports = (err, req, res, next) => {
  handleError(err, res);
};
