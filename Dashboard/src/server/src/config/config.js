const dotenv = require('dotenv');
dotenv.config();


const config = {
  db: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
  },
  env: process.env.NODE_ENV,
  appPort: process.env.APP_PORT,
  frontendBaseUrl: process.env.FE_BASE_URL
};

module.exports = config;
