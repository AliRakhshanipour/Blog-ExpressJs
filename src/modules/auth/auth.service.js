import autoBind from 'auto-bind';
import { Op } from 'sequelize';
import { models } from '../../models/index.js';
import { UserExistsError } from './auth.errors.js';

export const AuthService = (() => {
  class AuthService {
    #model;
    constructor() {
      autoBind(this);
      this.#model = models.User;
    }

    async register(UserDTO) {
      const { username, email, phone, password } = UserDTO;

      const existingUser = await this.#model.findOne({
        where: {
          [Op.or]: [{ email }, { phone }, { username }],
        },
      });
      if (existingUser) {
        throw new UserExistsError('this user already exists');
      }

      const user = await this.#model.create({
        username,
        email,
        phone,
        password,
      });

      return user;
    }
  }

  return new AuthService();
})();
