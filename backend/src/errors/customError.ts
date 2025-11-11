class CustomError extends Error {
  statusCode: number;
  errors: {};
  message: string;

  constructor(statusCode: number, errors: {}, message: string) {
    super();
    this.statusCode = statusCode;
    this.errors = errors;
    this.message = message;
  }
}

export default CustomError;
