const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Middleware should be defined early
app.use(express.json());

mongoose
  .connect()
  .then((result) => {
    app.listen(8000);
    console.log("Connected to DataBase");
  })
  .catch((err) => {
    console.log(err);
  });
