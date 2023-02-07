
const jwt =require("jsonwebtoken");
const { UserModel } = require("../model/auth.model");
require("dotenv").config()
const token_secret = process.env.TOKEN_KEY;
const getCartData = async (req, res) => {
    let Bearer = req.headers["authorization"]
    let splittoken = Bearer.split(" ")
    try {
        var decode = jwt.verify(splittoken[1], token_secret)
        if (decode) {
            let userEmail = decode.email
            let user = await UserModel.findOne({email: userEmail });
            if (user) {
                return res.send({
                    data: user.cartItem,
                    message: ""
                })
            } else {
                return res.send({
                    message: "something went wrong"
                })
            }


        }

    } catch (error) {
        return res.send(error)
    }
}

module.exports = {
    getCartData
}