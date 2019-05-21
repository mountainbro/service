const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:String,
    createAt:{type:Date, default:Date.now()},
    updateAt : {type:Date,default:Date.now()},
},{
    collection:'category'
})
mongoose.model('category',categorySchema)