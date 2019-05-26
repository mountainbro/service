const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
    typeName:String,
    createAt:{type:Date, default:Date.now()},
    updateAt : {type:Date,default:Date.now()},
},{
    collection:'type'
})

mongoose.model('type',typeSchema)