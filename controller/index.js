const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const qiniu = require('qiniu')

const hello = async (ctx, next) => {
  ctx.body = "Hello"
};

const qiniuToken = async (ctx) => {
  var accessKey = 'BYzCKUDMoPirtnxd-pEEE4lRdPcnsS-vgc2l0jmL';
  var secretKey = 'IwtT9Hi6v58D2mc1YlV2karuV3XilawgmWVgRAOa';
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  //自定义凭证有效期（示例2小时，expires单位为秒，为上传凭证的有效时间）
  var options = {
    scope: 'moshi-yushan-public-bucket',
    expires: 7200,
  };
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken = await putPolicy.uploadToken(mac);
  ctx.body = {
    code: 200,
    message: 'success',
    qiniuToken: uploadToken
  }
}
const register = async (ctx) => {
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
}
const login = async (ctx, next) => {
  let userName, password, phone;
  ({ userName, password, phone } = ctx.request.body)
  const User = mongoose.model('User');
  let info = {
    userName: userName,
    password: password
  }
  const secretOrPrivateKey = 'salt'
  const token = jwt.sign(
    info,
    secretOrPrivateKey,
    {
      expiresIn: 60 * 60 * 2 //120分钟到期时间
    }

  )

  let data = await User.findUser(info, function (err, user) {
    if (err) ctx.body = { code: 500, message: error }
  })
  if (data.length > 0) {
    ctx.body = { code: 200, data: data[0], token };
    User.updateLoginAt(info, function (err, res) { })
  } else {
    ctx.body = { code: 200, message: '用户名不存在' }
  }

}

module.exports = {
  "GET /":hello,
  "GET /qiniuToken":qiniuToken,
  "POST /register":register,
  "POST /login":login
  
}

