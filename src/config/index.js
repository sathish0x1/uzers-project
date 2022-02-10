const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", "..", ".env") });

const config = {
  app: {
    PORT: process.env.PORT,
  },
  db: {
    HOST: process.env.DB_HOST,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    NAME: process.env.DB_NAME,
  },
  mailer: {
    API_KEY: process.env.SENDGRID_API_KEY,
    SENDER_MAIL: process.env.SENDGRID_FALLBACK_EMAIL,
  },
  jwt: {
    ACCESS_TOKEN: process.env.ACCESS_TOKEN_SECRET_KEY,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN_SECRET_KEY,
    ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  },
};
module.exports = config;
