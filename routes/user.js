const express = require("express");
const userController = require("../controllers/user");
const authToken = require("../auth/jwtAuthToken");
const router = express.Router();

router.post("/login", userController.postLogin);

router.post("/signup", userController.postSignup);

router.use(authToken);

router.post("/logout", userController.postLogout);

module.exports = router;
