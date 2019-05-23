const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    author:Object,
    title:String,
    type:String,
    tags:Array,
    viewCount:Number,
    likeCount:Number,
    createAt:{type:Date, default:Date.now()},
    updateAt : {type:Date,default:Date.now()},

},{
    collection:'article'
})
mongoose.model('article',articleSchema);
