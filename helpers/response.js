class BaseResponse {
  constructor(title, message) {
    this.title = title;
    this.message = message;
  }
}

class Success extends BaseResponse {}

class Data extends BaseResponse {
  constructor(data, title, message) {
    super(title, message);
    this.data = data;
  }
}

class ErrorResponse extends BaseResponse {
  constructor(status, title, message) {
    super(title, message);
    this.status = status;
  }
}

module.exports = {
  Success,
  Data,
  ErrorResponse
};
