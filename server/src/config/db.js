const Sequelize = require("sequelize");

module.exports = new Sequelize(
  "pre_enrollment_web_app",
  "john_padillo",
  "padillorrerr",
  {
    host: "localhost",
    dialect: "postgres"
  }
);
