const mongoose = require('mongoose');
import crypto from "crypto";
const userSchema = new mongoose.Schema({
    userName : String,
    password : String,
    createAt : {type:Date,default:Date.now()},
    lastLoginAt : {type:Date,default:Date.now()},
    userType : {type:Number,default:10001},
    phone:String
},{
    collection:'user'
})

const md5 = (str)=>crypto.createHash('md5').update(str.toString()).digest("hex")

userSchema.pre('save',function(next){
    this.password = md5(this.password)
    next();
})
userSchema.methods={

}
userSchema.statics={
    findUser:function(info,cb){
        info.password = md5(info.password)
        return this.find(info,cb)
    },
    updateLoginAt:function(info,cb){
        info.lastLoginAt = Date.now();
        return this.updateOne(info,cb)
    }
}

mongoose.model('User',userSchema)