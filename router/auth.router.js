const express = require("express");
const { signupUser, loginUser } = require("../controller/auth.controller");
let authRouter = express.Router();

authRouter.post("/signup", signupUser)
authRouter.post("/login", loginUser)

  module.exports = authRouter