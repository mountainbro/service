const mongoose = require('mongoose')
//私有方法
const add = async function (ctx, collection) {
  let name = ctx.query.name;
  const coll = mongoose.model(collection);
  let collinfo = new coll({ name: name })
  let userAuth = ctx.query.userType;
  if (!userAuth) {
    return {
      code: 410,
      msg: '没有权限',
    }
  }
  if (!name || userAuth <= 10001) {
    return {
      code: 410,
      msg: '参数不全',
    }
  }
  let res = await coll.findOne({ name: name })
  if (res) {
    return {
      code: 200,
      msg: '已经创建过',
    }
  }
  return await collinfo.save().then((res) => {
    return {
      code: 200,
      msg: '创建成功',
    }
  }).catch(error => {
    return {
      code: 500,
      message: error
    }
  })

}
const search = async(ctx,collection)=>{
  const coll = mongoose.model(collection);
  let name = ctx.query.name || '';
  var reg = new RegExp(name, 'i')
  let data = await coll.find({ name: { '$regex': reg } }, { __v: 0 });
  if (data.length>0) {
    return {
      code: 200,
      data,
      msg: 'success'
    }
  } else {
    return {
      code: 410,
      msg: 'no data'
    }
  }
}


//接口
const addType = async (ctx, next) => {
  let body = await add(ctx, 'type');
  ctx.body = body;
}
const addTag = async(ctx,next)=>{
  let data = await add(ctx,'tag');
  ctx.body = data;
}
const typeList = async (ctx, next) => {
  let data = await search(ctx,'type')
  ctx.body = data;
}
const tagList = async (ctx, next) => {
  let data = await search(ctx,'tag')
  ctx.body = data;
}
module.exports = {
  "GET /addType": addType,
  "GET /typeList": typeList,
  "GET /addTag": addTag,
  "GET /tagList": tagList,
  


}