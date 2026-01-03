const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

// router.post("/login", userController, postLogin);

// router.get("/signup", userController.getSignup);

router.post("/login", userController.postLogin);

router.post("/signup", userController.postSignup);

// router.post("/logout", userController.postLogout);

module.exports = router;
