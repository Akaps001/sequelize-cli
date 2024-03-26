const express = require("express");
const api = express();
const port = process.env.PORT || 2323;

const sequelize = require("./connection");
const { createUser } = require("./controllers/auth.controllers");

//MIDDLEWARE TO BE ABLE TO READ IN JSON FORMAT
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.get("/", async (req, res) => {
  return res.status(200).json({ message: "amox-api" });
});
//auth controller
api.post("/", createUser);

api.listen(port, async function () {
  console.log(`Service listening on port ${port}`);
  try {
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
    await sequelize.authenticate();
    console.log("Database connected successfully :).");
  } catch (err) {
    console.log(err.message);
    // console.error("unable to connect ");
  }
});
