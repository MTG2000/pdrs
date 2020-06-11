module.exports = class ApiError extends Error {
  constructor(statusCode, title, message, error = null) {
    super();
    this.statusCode = statusCode;
    this.title = title;
    this.message = message;
    this.errorObject = error;
  }

  static BadRequest(title, msg, error) {
    return new ApiError(400, title, msg, error);
  }

  static NotFound(title, msg, error) {
    return new ApiError(404, title, msg, error);
  }

  static InternalError(title, msg, error) {
    return new ApiError(500, title, msg, error);
  }

  static Unauthorized(title, msg, error) {
    return new ApiError(401, title, msg, error);
  }

  static Forbidden(title, msg, error) {
    return new ApiError(403, title, msg, error);
  }
};
