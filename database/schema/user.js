const mongoose = require('mongoose');
import crypto from "crypto"
const userSchema = new mongoose.Schema({
    userName : {unique:true,type:String},
    password : String,
    createAt : {type:Date,default:Date.now()},
    lastLoginAt : {type:Date,default:Date.now()},
    userType : {type:Number,fefault:10001}
},{
    collection:'user'
})
const md5 = (str)=>crypto.createHash('md5').update(str.toString()).digest("hex")
// userSchema.pre('save',function(next){
//     this.password = md5(this.password)
// })
userSchema.methods={
    comparePassword:(_password,password)=>{
        return isMatch = md5(_password)===password?true:false;
    }
}

mongoose.model('User',userSchema)