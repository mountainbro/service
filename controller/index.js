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
router.post('/register',async(ctx)=>{
   console.log(ctx.request.body)
  const User = mongoose.model('User')
  let newUser = new User(ctx.request.body)
  console.log(newUser)
  await newUser.save().then(()=>{
      ctx.body={
          code:200,
          message:'注册成功'
      }
  }).catch(error=>{
      ctx.body={
          code:500,
          message:error
      }
  })
})
router.post('/login', async (ctx, next) => {
  let name, password, phone;
  ({ name, password, phone } = ctx.request.body)
  const User = mongoose.model('User');
  await User.findOne({ userName: name }).exec().then(async (result) => {

    console.log('in _____',result)
    if (result) {
      let newUser = new User()
      await newUser.comparePassword(password, result.password)
        .then(isMatch => {
          ctx.body = { code: 200, message: isMatch }
        })
        .catch(error => {
          console.log(error)
          ctx.body = { code: 500, message: error }
        })
    } else {
      ctx.body = { code: 200, message: '用户名不存在' }
    }
  }).catch(error => {
    console.log(error)
    ctx.body = { code: 500, message: error }
  })

  ctx.body = "register login demo"
})
router.get('/register', async (ctx, next) => {
  console.log(1);
  ctx.body = "register get demo"
  // const User = mongoose.model('User');
  // ({name,password,phone}=ctx.body)
  // console.log(name,password,phone)
})

// module.exports = router
export default router
