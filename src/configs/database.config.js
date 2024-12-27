import { Sequelize } from 'sequelize';

export const sequellize = new Sequelize({
  username: 'alirakhshanipur',
  password: '',
  host: 'localhost',
  port: 5432,
  database: 'my-blog',
  dialect: 'postgres',
  logging: false,
});

export const dbAuthenticate = async () => {
  try {
    await sequellize.authenticate();
    console.log('database successfully authenticated');
  } catch (error) {
    console.log('database authentication failed');
  }
};
