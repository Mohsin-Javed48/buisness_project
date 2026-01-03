const express = require("express");

const router = express.Router();

router.get("/login", userController.getLogin);

router.get("/signup", userController.getSignup);

router.post("/login", userController.postLogin);

router.post("/signup", userController.postSignup);

router.post("/logout", userController.postLogout);

module.exports = router;
