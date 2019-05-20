
const jwt = require('jsonwebtoken');  //用来生成token

async function check(ctx,next){
    let url = ctx.request.url;
    if (url == "/login") {
        await next()
        return
    };
    // let token = ctx.request.headers["authorization"];
    // jwt.verify(token,'salt',async(err,decode)=>{
    //     if (err){
    //         ctx.body = { code: 200, message: '无效token，请重新登录。' }
    //         console.log('时间失效的时候 || 伪造的token')
    //     }else{
    //         console.log(decode)
    //         await next();
    //     }
        
    // })
    if (!ctx.request.headers["authorization"]) {
        return (ctx.body = {
            err: '无效token'
        })
    } else {
        try {
            let token = await jwt.verify(
                ctx.request.headers["authorization"],
                'salt'
            )
            console.log(token)
            if (token.userName) await next()
            else return (ctx.body = { err: '无效token' })
        } catch (error) {
            console.log(error)
            return (ctx.body = { err: '无效token' })
        }
    }
    
    
}

module.exports = check

