const mongoose = require('mongoose');
import crypto from "crypto"
import { resolve, reject } from "_any-promise@1.3.0@any-promise";
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
    comparePassword:(_password,passwords)=>{
        return new Promise((resolve,reject)=>{
            passwords.forEach(element => {
                if (md5(_password)===element.password){
                    resolve(element);
                    return
                }
            });
            reject('匹配失败');

        })
    }
}

mongoose.model('User',userSchema)