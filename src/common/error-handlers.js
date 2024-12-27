import { StatusCodes } from 'http-status-codes';

export const ErrorHandler = (application) => {
  class ErrorHandler {
    #app;
    constructor() {
      this.#app = application;
      this.notFoundHandler();
      this.allExeptionHandler();
    }

    // Handler for unknown routes (404)
    notFoundHandler() {
      return this.#app.use((req, res, next) => {
        const status = StatusCodes.NOT_FOUND;
        const message = `Route not found`;
        res.status(status).json({
          message,
        });
      });
    }

    // General exception handler for all errors
    allExeptionHandler() {
      return this.#app.use((err, req, res, next) => {
        let status =
          err.status || err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        let message = err.msg || err.message || `Internal Server Error`;

        // Handle SequelizeValidationError specifically
        if (err.name === 'SequelizeValidationError') {
          // Map the validation errors into a structured response
          const validationErrors = err.errors.map((e) => e.message);
          status = StatusCodes.BAD_REQUEST; // Return 400 for validation errors
          message = validationErrors;
        }

        res.status(status).json({
          message,
        });
      });
    }
  }

  return new ErrorHandler();
};
