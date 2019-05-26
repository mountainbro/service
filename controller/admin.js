const router = require('koa-router')();
const mongoose = require('mongoose')


router.get('/addType', async (ctx, next) => {

    let data = ctx.query;
    const Type = mongoose.model('type');
    let type = new Type({ typeName: data.typeName })
    if (!(data.typeName) && data.userType <= 10001) {
      ctx.body = {
        code: 410,
        msg: '没有权限',
      }
      return
    }
    let res = await Type.findOne({ typeName: data.typeName })
    if (res) {
      ctx.body = {
        code: 200,
        msg: '已经创建过',
      }
      return
    }
    await type.save().then((res) => {
      ctx.body = {
        code: 200,
        msg: '创建成功',
      }
    }).catch(error => {
      ctx.body = {
        code: 500,
        message: error
      }
    })
})