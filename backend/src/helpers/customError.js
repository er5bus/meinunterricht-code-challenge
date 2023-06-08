export class CustomError extends Error {
  constructor(message, code, cause) {
    super(message);
    this.name = "CustomError";
    this.code = code;
    this.cause = cause;
  }
}
