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
  await User.find({ userName: userName }).exec().then(async (result) => {
    if (result) {
      let newUser = new User()
      await newUser.comparePassword(password, result)
        .then(isMatch => {
          let userType,id,phone;
          ({userType,id,phone} = isMatch)
          ctx.body = { code: 200, userType,id,phone}
          User.updateOne({userName:userName},{lastLoginAt:Date.now()}).exec();
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

})

// module.exports = router
export default router
