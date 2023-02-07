const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String || Number,required:true},
    cartItem:[
        {productId:{type:mongoose.Schema.Types.ObjectId,ref:"products"}}]
},{
    timestamps:true  
})

const UserModel = mongoose.model('users',UserSchema);
module.exports = {UserModel}