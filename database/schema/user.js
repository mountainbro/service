const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName : {unique:true,type:String},
    password : String,
    createAt : {type:Date,default:Date.now()},
    lastLoginAt : {type:Date,default:Date.now()},
    userType : Array
},{
    collection:'user'
})

mongoose.model('User',userSchema)