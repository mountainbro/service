const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name:String,
    createAt:{type:Date, default:Date.now()},
    updateAt : {type:Date,default:Date.now()},
},{
    collection:'tag'
})
mongoose.model('tag',tagSchema)