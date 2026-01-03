const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Compare password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "An error occurred" });
        }

        if (!isMatch) {
          return res.status(401).json({ message: "Invalid email or password" });
        }

        // ✅ Create session
        req.session.isLoggedIn = true;
        req.session.user = {
          _id: user._id.toString(),
          email: user.email,
        };

        req.session.save((err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Session save failed" });
          }
          return res.status(200).json({ message: "Login successful" });
        });
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

const postSignup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating user" });
  }
};

module.exports = {
  postLogin,
  postSignup,
};
