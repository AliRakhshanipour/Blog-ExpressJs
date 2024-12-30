// user.model.js
import bcrypt from 'bcrypt';
import { DataTypes, Model } from 'sequelize';

export class User extends Model {}

export const initUser = (sequelize) => {
  return User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Username must not be empty' },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
      timestamps: true,

      // Sequelize Hooks
      hooks: {
        // Hash password before creating the user
        beforeCreate: async (user) => {
          const saltRounds = 10; // Adjust the salt rounds as needed
          user.password = await bcrypt.hash(user.password, saltRounds);
        },

        // Hash password before updating the user, if password is changed
        beforeUpdate: async (user) => {
          // Only hash the password if it has been modified
          if (user.changed('password')) {
            const saltRounds = 10;
            user.password = await bcrypt.hash(user.password, saltRounds);
          }
        },
      },
    }
  );
};
