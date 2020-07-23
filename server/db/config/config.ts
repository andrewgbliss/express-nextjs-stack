import path from 'path';
require('dotenv').config({
  path: path.join(__dirname, '..', '..', '..', '..', '.env'),
});

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    logging: false,
    define: {
      syncOnAssociation: false,
    },
    syncOnAssociation: false,
    sync: { force: false },
    seederStorage: 'sequelize',
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    logging: false,
    define: {
      syncOnAssociation: false,
    },
    syncOnAssociation: false,
    sync: { force: false },
    seederStorage: 'sequelize',
  },
};
