const router = require('koa-router')()
const mongoose = require('mongoose')
router.get('/', async (ctx, next) => {
  ctx.body = "Hello"
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
router.post('/register',async(ctx,next)=>{
  console.log(1);
  const User = mongoose.model('User');
  ({name,password,phone}=ctx.body)
  console.log(name,password,phone)
})

// module.exports = router
export default router
