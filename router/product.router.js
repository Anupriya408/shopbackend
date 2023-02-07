const express = require("express");
const { getProductById,getProds, addToCart } = require("../controller/product.controller");
let productRouter = express.Router();

productRouter.get("/addtocart/:id", addToCart)
productRouter.get("/product/:id", getProductById)
productRouter.get("/products", getProds)

  module.exports = productRouter