import { StatusCodes } from 'http-status-codes';

export class UserNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserNotFoundError';
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export class UserExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserExistsError';
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export class PostNotCreatedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PostNotCreatedError';
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
