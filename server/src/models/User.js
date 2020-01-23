const Sequelize = require("sequelize");

//import database
const db = require("../config/db");

const User = db.define("users", {
  first_name: {
    type: Sequelize.STRING
  },
  middle_name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  permanent_address: {
    type: Sequelize.STRING
  },
  contact_no: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  },
  name_of_parents: {
    type: Sequelize.STRING
  },
  contact_no_of_parents: {
    type: Sequelize.STRING
  },
  course: {
    type: Sequelize.STRING
  },
  createdAt: {
    type: Sequelize.DATE
  },

  updatedAt: {
    type: Sequelize.DATE
  }
});

module.exports = User;
