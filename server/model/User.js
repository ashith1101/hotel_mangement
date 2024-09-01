const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
    },
    googleId:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    loyaltyPoints:{
        type:Number,
        default:0,
    },
});

module.exports=mongoose.model('User',UserSchema);