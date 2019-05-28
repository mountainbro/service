const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    author:Object,
    title:String,
    type:String,
    tags:Array,
    viewCount:Number,
    likeCount:{type:Number, default:0},
    createAt:{type:Number, default:0},
    updateAt : {type:Date,default:Date.now()},

},{
    collection:'article'
})
mongoose.model('article',articleSchema);
