const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const postLogin = (req, res, next) => {
  const email = req.body.email;
  const userPassword = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      bcrypt.compare(userPassword, user.password).then((doMatch) => {
        if (doMatch) {
          return res.status(200).json({ message: "Login successful" });
        }
        return res.status(401).json({ message: "Invalid password" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "An error occurred" });
    });
};

const postSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const userPassword = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }
    if (userPassword === confirmPassword) {
      bcrypt.hash(userPassword, 12).then((hashedPassword) => {
        User.create({
          name: name,
          email: email,
          password: hashedPassword,
          role: "user",
          isVerified: false,
        })
          .then((result) => {
            return res
              .status(201)
              .json({ message: "User created successfully" });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Error creating user" });
          });
      });
    } else {
      return res.status(400).json({ message: "Passwords do not match" });
    }
  });
};

module.exports = {
  postLogin,
  postSignup,
};
