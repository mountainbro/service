const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id:mongoose.Types.ObjectId(),
    name:String,
    createAt:{type:Date, default:Date.now()},
    updateAt : {type:Date,default:Date.now()},
},{
    collection:'category'
})
mongoose.Schema('category',categorySchema)