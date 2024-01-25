class ApiError {
  constructor(statusCode, message = "Failed", errors = [], stack = "") {
    this.statusCode = statusCode;
    this.message = message;
    this.success = statusCode < 400;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
