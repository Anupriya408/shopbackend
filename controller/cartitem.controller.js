const { ProductModel } = require("../model/product.model");
const { UserModel } = require("../model/auth.model");
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { default: jwtDecode } = require("jwt-decode");
const { CartItemmodel } = require("../model/cartitem.model");
const token_secret = process.env.TOKEN_KEY;

const addToCart = async (req, res) => {
    let { id } = req.params;
    // let item_id = item._id.toString()
    let Bearer = req.headers["authorization"]
    let splittoken = Bearer.split(" ")
    let token = splittoken[1].replace('"', '');
    try {
        var decode = jwt.verify(token, token_secret)
        if (decode) {
            let userEmail = decode.email
            let user = await UserModel.findOne({ email: userEmail });
            let product = await ProductModel.findOne({ _id: id });
            let b = user._id.toString()
            let a = b.replace('"', "");
            let checkuser = await CartItemmodel.findOne({ userId: a })
            if (checkuser) {
                let existing_prod = await CartItemmodel.findOne({ "cartItem.cartId": id });
                if (existing_prod) {
                    return res.send({
                        code: 404,
                        message: "Item Already in Cart"
                    })
                } else {
                    let cart = await CartItemmodel.findOneAndUpdate(
                        { userId: checkuser.userId },
                        {
                            $push: {
                                cartItem: {
                                    cartId: id,
                                    name: product.name,
                                    image_1: product.image_1,
                                    image_2: product.image_2,
                                    image_3: product.image_3,
                                    image_4: product.image_4,
                                    image_5: product.image_5,
                                    price: product.price,
                                    sold: product.sold,
                                    manufacture_date: product.manufacture_date,
                                    color: product.color,
                                    size: product.size,
                                    stock: product.stock,
                                    Qty: 1
                                }
                            }
                        },
                        { new: true }
                    )
                    return res.send({
                        code: 200,
                        message: "Item Added in cart",
                        data: cart
                    })
                }

            } else {
                let cart = await CartItemmodel.create({
                    userId: a,
                    cartItem: [
                        {
                            cartId: id,
                            name: product.name,
                            image_1: product.image_1,
                            image_2: product.image_2,
                            image_3: product.image_3,
                            image_4: product.image_4,
                            image_5: product.image_5,
                            price: product.price,
                            sold: product.sold,
                            manufacture_date: product.manufacture_date,
                            color: product.color,
                            size: product.size,
                            stock: product.stock,
                            Qty: 1
                        }
                    ]
                })
                return res.send({
                    code: 200,
                    message: "User Item Added in cart",
                    data: cart
                })

            }
        }
    }
    catch (err) {
        res.send({
            code: 404,
            message: "Invalid Token",
            err
        })
    }
}

const getUserCart = async (req, res) => {
    let Bearer = req.headers["authorization"]
    let splittoken = Bearer.split(" ")
    let token = splittoken[1].replace('"', '');
    try {
        var decode = jwt.verify(token, token_secret)
        if (decode) {
            let userId = decode.userId.toString()
            let userCart = await CartItemmodel.findOne({ userId: userId });
            let cartItem = userCart?.cartItem || []
            return res.send({ cartItem })
        }
    }
    catch (err) {
        console.log(err);
        return res.send({
            err
        })
    }
}

const updateCartQty = async (req, res) => {
    let Bearer = req.headers["authorization"]
    let splittoken = Bearer.split(" ")
    let token = splittoken[1].replace('"', '');
    const { id } = req.params
    const { Qty } = req.body
    try {
        if (Qty > 0) {
            let existing_prod = await CartItemmodel.findOneAndUpdate({ "cartItem.cartId": id },
                {
                    '$set': {
                        "cartItem.$.Qty": Qty
                    },
                },
                { new: true }
            );
            var decode = jwt.verify(token, token_secret)
            if (decode) {
                let userId = decode.userId.toString()
                let userCart = await CartItemmodel.findOne({ userId: userId });
                let cartItem = userCart?.cartItem || []
                return res.send({
                    cartItem,
                    message: ""
                })
            }
        } else {

            var decode = jwt.verify(token, token_secret)
            if (decode) {
                let userId = decode.userId.toString()
                let deletedItem = await CartItemmodel.findOneAndUpdate(
                    { userId: userId },
                    { $pull: { cartItem: { cartId: id } } }
                )
                let userCart = await CartItemmodel.findOne({ userId: userId });
                let cartItem = userCart?.cartItem || []
                return res.send({
                    cartItem,
                    message: "Item Removed Succesfully"
                })
            }
        }
    } catch (error) {
        res.send(error)
    }

}


const clearCart = async (req, res) => {
    let Bearer = req.headers["authorization"]
    console.log(Bearer);
    let splittoken = Bearer.split(" ")
    let token = splittoken[1].replace('"', '');
    try {
        var decode = jwt.verify(token, token_secret)
        if (decode) {
            let userId = decode.userId.toString()
           let data =  await CartItemmodel.findOneAndUpdate(
                { userId: userId },
                { $set: { cartItem: [] } },
                {new:true}
            )
            if(data){
                let userCart = await CartItemmodel.findOne({ userId: userId });
                let cartItem = userCart?.cartItem || []
                return res.send({
                    cartItem,
                    message: ""
                })
            }else{
                return res.send({
                    cartItem,
                    message: ""
                }) 
            }
        }

    } catch (error) {
        return res.send(error)
    }
}
const getCart = async (req, res) => {
    let data = await CartItemmodel.find()
    return res.send({
        data
    })
}
module.exports = {
    addToCart,
    getCart,
    getUserCart,
    updateCartQty,
    clearCart
}