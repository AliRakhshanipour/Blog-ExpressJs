import { DataTypes, Model } from 'sequelize';

class Post extends Model {}

export const initPost = (sequelize) => {
  return Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'Primary key, auto-incrementing identifier',
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Title must not be empty',
          },
          len: {
            args: [5, 255],
            msg: 'Title must be between 5 and 255 characters long',
          },
        },
        comment: 'Title of the post, required field',
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Text must not be empty',
          },
          len: {
            args: [10, 10000],
            msg: 'Text must be between 10 and 10,000 characters',
          },
        },
        comment: 'Main content of the post, required field',
      },
    },
    {
      sequelize,
      timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
      tableName: 'posts',
      modelName: 'Post',
    }
  );
};
