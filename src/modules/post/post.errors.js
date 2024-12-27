import { StatusCodes } from 'http-status-codes';

export class PostNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PostNotFoundError';
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export class PostNotCreatedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PostNotCreatedError';
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
