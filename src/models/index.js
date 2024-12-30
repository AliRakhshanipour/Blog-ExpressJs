import { sequellize } from '../configs/database.config.js';
import { initPost } from './post.model.js';
import { initUser } from './user.model.js';

// Initialize all models
export const models = {
  Post: initPost(sequellize),
  User: initUser(sequellize),
};

export const syncModels = async () => {
  try {
    await sequellize.sync({ alter: true }); // `alter: true` adjusts the database schema if needed
    console.log('Models synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
};
