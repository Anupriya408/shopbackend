const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    cartItem:[
        {cartId:{type:mongoose.Schema.Types.ObjectId,ref:"products"},
        name:{type:String,required:true},
        image_1:{type:String,required:true},
        image_2:{type:String,required:true},
        image_3:{type:String,required:true},
        image_4:{type:String,required:true},
        image_5:{type:String,required:true},
        price:{type:Number,required:true},
        sold:{type:Number,required:true},
        manufacture_date:{type:String,required:true},
        color:{type:String,required:true},
        size:{type:String,required:true},
        stock:{type:String,required:true},
        Qty:{type:Number}
    }
    ]
},{
    timestamps:true  
})

const CartItemmodel = mongoose.model('cartitem',cartItemSchema);
module.exports = {CartItemmodel}