import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('blockchain_db', 'blockchain_user', 'pass', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Disable logging; enable it if debugging
});
export const connectToPostgreDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter : true })
    console.log('Connected to database.');
  } catch (error) {
    console.error('Error connecting to PostgreSQL database:', error);
  }
};

export default sequelize