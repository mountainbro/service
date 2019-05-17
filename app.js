const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors')
const {initSchema,connect} = require('./database/init');
const bodyparser = require('koa-bodyparser');
import home from './controller/';




const router = new Router({
    prefix:'/api'
})
;(async()=>{
    await connect();
    initSchema();
})()

router.get('/',async(ctx,next)=>{
    ctx.body="haha"
})
const app = new Koa();
app.use(bodyparser())
app.use(router.routes())
app.use(home.routes())
app.use(cors({
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));

app.listen(6446,()=>{
    console.log('port is at 6446')
})