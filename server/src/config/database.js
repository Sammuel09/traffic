const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'tms',
  process.env.DB_USER || 'me',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connection established successfully.');

    // Import all models to ensure they're registered with sequelize
    require('../models');

    // Note: Use migrations instead of sync in production
    // Run migrations manually: npm run db:migrate
    // For development only, you can use sync (optional):
    // if (process.env.NODE_ENV === 'development' && process.env.USE_SYNC === 'true') {
    //   await sequelize.sync({ alter: true });
    //   console.log('✓ Database tables synced from models.');
    // }
  } catch (error) {
    console.error('✗ Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
