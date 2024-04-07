const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

//handle error
const handleError = (err) => {
  let errors = { fName: "", lName: "", email: "", password: "" };

  //incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  //validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      if (properties.path === "email") {
        errors.email = properties.message;
      } else if (properties.path === "password") {
        errors.password = properties.message;
      } else if (properties.path === "fName") {
        errors.fName = properties.message;
      } else if (properties.path === "lName") {
        errors.lName = properties.message;
      }
    });
  } else if (err.code === 11000) {
    errors.email = "That email is already registered";
  }
  return errors;
};

//creating jwt function
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: maxAge,
  });
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = async (req, res) => {
  const { fName, lName, email, password } = req.body;

  try {
    const user = await User.create({ fName, lName, email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id, message: "ok" });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000 });
    res.status(200).json({
      user: {
        userId: user._id,
        email: user.email,
        fName: user.fName,
        lName: user.lName,
      },
      token,
      message: "ok",
    });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

module.exports.signup_update = async (req, res) => {
  const { userId } = req.params;
  const { fName, lName, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fName, lName, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = createToken(updatedUser._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000 });
    res.status(200).json({
      user: {
        userId: updatedUser._id,
        email: updatedUser.email,
        fName: updatedUser.fName,
        lName: updatedUser.lName,
      },
      token,
      message: "ok",
    });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};
