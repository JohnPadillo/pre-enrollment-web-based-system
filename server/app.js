const express = require("express");
const port = 8081;

const app = express();

const Sequelize = require("sequelize");

// Option 1: Passing parameters separately
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql"
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.listen(port, () => {
  console.log("SSDJASHBDAHSDHSHdghasd");
  console.log(`${port}`);
});
