const mongoose = require('mongoose');
let artId = mongoose.Types.ObjectId();
const articleSchema = new mongoose.Schema({
    artId:{unique:true,type:String},
    author:Object,
    title:String,
    tags:Array,
    viewCount:Number,
    likeCount:Number,
    createAt:{type:Date, default:Date.now()},
    updateAt : {type:Date,default:Date.now()},

},{
    collection:'article'
})
mongoose.model('article',articleSchema);
