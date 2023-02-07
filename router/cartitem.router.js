const express = require("express");
const { addToCart, getCart, getUserCart, updateCartQty, clearCart } = require("../controller/cartitem.controller");
let cartItemRouter = express.Router();

cartItemRouter.get("/user/addtocart/:id", addToCart)
cartItemRouter.get("/cartitem", getCart)
cartItemRouter.get("/user/cartitem", getUserCart)
cartItemRouter.put("/user/cartitem/:id", updateCartQty)
cartItemRouter.get("/user/clearcart", clearCart)
  module.exports = cartItemRouter