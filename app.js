const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors')
const {initSchema,connect} = require('./database/init');
const bodyparser = require('koa-bodyparser');
const staticPath = require('koa-static');
import router from './router';
const check = require('./middware/token_judge')

;(async()=>{
    await connect();
    initSchema();
})()

const app = new Koa();
app.use(staticPath(__dirname + "/public"));

app.use(cors({
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));

app.use(bodyparser()).use(router())

app.listen(6446,()=>{
    console.log('port is at 6446')
})