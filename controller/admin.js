const mongoose = require('mongoose')
//私有方法
const add = async function (ctx, collection) {
  console.log('i   am   in add function ')
  let name = ctx.query.name;
  const coll = mongoose.model(collection);
  let collinfo = new coll({ name: name })
  let userAuth = ctx.query.userType;
  if (!userAuth) {
    ctx.body = {
      code: 410,
      msg: '没有权限',
    }
    return
  }
  if (!name || userAuth <= 10001) {
    ctx.body = {
      code: 410,
      msg: '参数不全',
    }
    return
  }
  let res = await coll.findOne({ name: name })
  if (res) {
    ctx.body = {
      code: 200,
      msg: '已经创建过',
    }
    return
  }
  console.log(res)
  await collinfo.save().then((res) => {
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

}


//接口
const addType = async (ctx, next) => {
  add(ctx, 'type').then((res)=>{
    console.log(res,1)
  }).catch(err=>{
    console.log(err,2)
  })
  // let data = ctx.query;
  // const Type = mongoose.model('type');
  // let type = new Type({ typeName: data.typeName })
  // if (!(data.typeName) || data.userType <= 10001||!(data.userType)) {
  //   ctx.body = {
  //     code: 410,
  //     msg: '参数不全',
  //   }
  //   return
  // }
  // let res = await Type.findOne({ typeName: data.typeName })
  // if (res) {
  //   ctx.body = {
  //     code: 200,
  //     msg: '已经创建过',
  //   }
  //   return
  // }
  // await type.save().then((res) => {
  //   ctx.body = {
  //     code: 200,
  //     msg: '创建成功',
  //   }
  // }).catch(error => {
  //   ctx.body = {
  //     code: 500,
  //     message: error
  //   }
  // })
}
const typeList = async (ctx, next) => {
  const Type = mongoose.model('type');
  let name = ctx.query.name || '';
  var reg = new RegExp(name, 'i')
  let data = await Type.find({ typeName: { '$regex': reg } }, { __v: 0 });
  if (data) {
    ctx.body = {
      code: 200,
      data,
      msg: 'success'
    }
  } else {
    ctx.body = {
      code: 410,
      msg: 'failed'
    }
  }
}
module.exports = {
  "GET /addType": addType,
  "GET /typeList": typeList,


}