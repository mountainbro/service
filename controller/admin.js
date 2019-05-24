const router = require('koa-router')();
const mongoose = require('mongoose')


router.get('/addType',async(ctx,next)=>{
    const type = mongoose.model('type');
    if (ctx.name && ctx.userType>10001){
        type({
            
        })
    }
})