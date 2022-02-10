const config = require("../../config/index");

module.exports = {
  development: {
    username: config.db.USERNAME,
    password: config.db.PASSWORD,
    database: config.db.NAME,
    host: config.db.HOST,
    dialect: "postgres",
  },
  test: {
    username: config.db.USERNAME,
    password: config.db.PASSWORD,
    database: config.db.NAME,
    host: config.db.HOST,
    dialect: "postgres",
  },
  production: {
    username: config.db.USERNAME,
    password: config.db.PASSWORD,
    database: config.db.NAME,
    host: config.db.HOST,
    dialect: "postgres",
  },
};
