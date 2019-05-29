const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    author:Object,
    title:String,
    type:String,
    tags:Array,
    content:String,
    viewCount:{type:Number, default:0},
    likeCount:{type:Number, default:0},
    createAt:{type:Date,default:Date.now()},
    updateAt : {type:Date,default:Date.now()},

},{
    collection:'article'
})
mongoose.model('article',articleSchema);
