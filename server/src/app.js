const express = require("express");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const port = 8081;

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(morgan("combined"));
app.use(cors());

const Sequelize = require("sequelize");

// Option 1: Passing parameters separately
const sequelize = new Sequelize(
  "pre_enrollment_web_app",
  "john_padillo",
  "padillorrerr",
  {
    host: "localhost",
    dialect: "postgres"
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

require("./routes")(app);

app.get("/status", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
