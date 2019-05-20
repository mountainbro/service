const router = require('koa-router')()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
router.get('/', async (ctx, next) => {
  ctx.body = "Hello"
})

router.post('/register', async (ctx) => {
  const User = mongoose.model('User')
  let newUser = new User(ctx.request.body)
  await newUser.save().then(() => {
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      message: error
    }
  })
})

router.post('/login', async (ctx, next) => {
  let userName, password, phone;
  ({ userName, password, phone } = ctx.request.body)
  const User = mongoose.model('User');
  let info = {
    userName:userName,
    password:password
  }
  const secretOrPrivateKey = 'salt'
  const token = jwt.sign(
    info,
    secretOrPrivateKey,
    {
      expiresIn: 60 * 60 *2 //120分钟到期时间
  }

  )
  
  let data = await User.findUser(info,function(err,user){
    if (err) ctx.body = { code: 500, message: error }
  })
  if (data.length>0){
    ctx.body = { code: 200, data:data[0],token};
    User.updateLoginAt(info,function(err,res){})
  }else{
    ctx.body = { code: 200, message: '用户名不存在' }
  }

})

// module.exports = router
export default router
