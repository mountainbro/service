const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
    name:String,
    createAt:{type:Date, default:Date.now()},
    updateAt : {type:Date,default:Date.now()},
},{
    collection:'type'
})

mongoose.model('type',typeSchema)