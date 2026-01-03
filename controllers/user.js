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
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const postSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const userPassword = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (userPassword !== confirmPassword) {
      User.create({
        name: name,
        email: email,
        password: userPassword,
        role: "user",
        isVarified: false,
      })
        .then((result) => {
          return res.status(201).json({ message: "User created successfully" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

module.exports = {
  postLogin,
  postSignup,
};
