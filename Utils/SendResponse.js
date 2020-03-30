module.exports = class SendResponse {
  static ResponseStatus = Object.freeze({
    Success: 200,
    Created: 201,
    NotFound: 404,
    BadRequest: 400
  });

  static JsonSuccess(res, title = "Success", message = "", data = {}) {
    res.status(this.ResponseStatus.Success).json({ title, message, data });
  }

  static JsonCreated(
    res,
    title = "Created Successfully",
    message = "",
    data = {}
  ) {
    res.status(this.ResponseStatus.Created).json({ title, message, data });
  }

  static JsonData(res, data = {}) {
    res.status(this.ResponseStatus.Success).json({ data });
  }

  static JsonFailed(res, title = "Failed", message = "") {
    res.status(this.ResponseStatus.BadRequest).json({ title, message });
  }

  static JsonNotFound(res, title = "Not Found", message = "") {
    res.status(this.ResponseStatus.NotFound).json({
      title,
      message
    });
  }
};
