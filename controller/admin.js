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
  let name,order,page,size;
  let total = await coll.estimatedDocumentCount();
  ({name='',order='_id',page=1,size=3}=ctx.query)
  var reg = new RegExp(name, 'i');
  let hasNext = (total - size*page)>0?true:false;
  let condition = collection == 'article'? {title: { '$regex': reg } }:{ name: { '$regex': reg } };
  let data = await coll.find(condition,{ __v: 0 }).sort({'_id':-1});
  let art = {}
  if (collection == 'article'){
    data =  await coll.find(condition,{ __v: 0 }).sort({order:-1}).limit(+size).skip((+page-1)*size);
    art = {
      total:total,
      hasNext:hasNext,
    }
  }
  if (data.length>0) {
    let response = Object.assign(
      {
        code: 200,
        msg: 'success',
        data,
      },
      art
    );
    return response
  } else {
    return {
      code: 410,
      msg: 'no data'
    }
  }
}


//接口
const addType = async (ctx, next) => {
  ctx.body = await add(ctx, 'type');
}

const typeList = async (ctx, next) => {
  ctx.body = await search(ctx,'type')
}
const addTag = async(ctx,next)=>{
  ctx.body = await add(ctx,'tag');
}
const tagList = async (ctx, next) => {
  ctx.body = await search(ctx,'tag')
}
const addArticle = async (ctx,next)=>{
  const art = mongoose.model('article');
  let author,title,type,tags,content;
  
  ({author,title,type,tags,content} = ctx.request.body)
  if (author&&title&&type&&content&&tags.length>0){
    const artilce = new art({
      author,title,type,tags,content
    })
    let data = await artilce.save().then((res)=>{
      ctx.body = {
        code:200,
        msg:'文章添加成功'
      }
    }).catch(err=>{
      ctx.body = {
        code:410,
        msg:err
      }
    }) 
  }else{
    ctx.body = {
      code:200,
      msg:'信息不全'
    }
  }
  
  
}
const artList = async(ctx,next)=>{
  ctx.body = await search(ctx,'article')
}

module.exports = {
  "GET /addType": addType,
  "GET /typeList": typeList,
  "GET /addTag": addTag,
  "GET /tagList": tagList,
  "POST /addArticle": addArticle,
  "GET /artList": artList,
  
}