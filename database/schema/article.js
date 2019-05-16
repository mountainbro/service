const mongoose = require('mongoose');
let artId = mongoose.Types.ObjectId();
const articleSchema = new mongoose.Schema({
    artId:{unique:true,type:String},
    author:{unique:true,type:String},
    content:{unique:true,type:String},
    tags:Array,
    viewCount:Number,
    createAt:{type:Date, default:Date.now()}

},{
    collection:'article'
})
mongoose.model('article',articleSchema);