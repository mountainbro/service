const superagent = require('superagent');
const router = require('koa-router')();
const cheerio = require('cheerio');


let getData = async(ctx,next)=>{
    let word = ctx.params.word;
    console.log(word)
    superagent
        .get(`http://www.baidu.com/s?wd=${word}&pn=10&rn=3`)
        .end((err,res)=>{
            if(err){
                ctx.body = {
                    code:200,
                    err:err
                }
                return
            }
            var $ = cheerio.load(res.text)
            console.log(res.text)
        })
}
router.get('/novel/:word',getData)
module.exports = function(){
    return router.routes()
}