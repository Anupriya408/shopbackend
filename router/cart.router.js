const express = require("express");
const { getCartData } = require("../controller/cart.controller");
let cartRouter = express.Router();

cartRouter.get("/user/cart", getCartData)
  module.exports = cartRouter