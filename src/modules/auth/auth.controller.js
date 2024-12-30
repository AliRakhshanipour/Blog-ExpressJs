import autoBind from 'auto-bind';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from './auth.service.js';

export const AuthController = (() => {
  class AuthController {
    #service;
    constructor() {
      autoBind(this);
      this.#service = AuthService;
    }

    async register(req, res, next) {
      try {
        const { username, email, phone, password } = req.body;
        const user = await this.#service.register({
          username,
          email,
          phone,
          password,
        });

        res.status(StatusCodes.CREATED).json({
          message: 'user registered successfully',
          user,
        });
      } catch (error) {}
    }
  }

  return new AuthController();
})();
