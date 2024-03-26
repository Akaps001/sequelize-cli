const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateSignUpSchema } = require("../validators/user.validator");

async function createUser(req, res) {
  try {
    const validateError = validateSignUpSchema(req.body);
    console.log("request body:", req.body);
    if (validateError)
      return res.status(400).json({ message: validateError.message });
    const userExit = await User.findOne({
      where: { email: { email: req.body.email } },
    });
    if (userExit) {
      return res.status(400).json({ message: "user already exit" });
    }
    const user = await User.create(req.body);

    return res
      .status(201)
      .json({ message: "created successfully", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { createUser };
