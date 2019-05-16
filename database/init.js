const mongoose = require('mongoose');
const glob = require('glob');//使用 *等符号, 来写一个glob规则,像在shell里一样,获取匹配对应规则的文件
const { resolve } = require('path');//绝对路径和相对路径转换
const db = "mongodb://127.0.0.1/blog";//数据库

module.exports.initSchema = () => {
    var schemas = glob.sync(resolve(__dirname, './schema', '**/*.js'));
    console.log(schemas);
    schemas.forEach(require)
}

exports.connect = () => {
    mongoose.connect(db, {
        useCreateIndex: true,
        useNewUrlParser: true
    })
    let maxConnectTimes = 0;

    return new Promise((resolve, reject) => {
        function maxconnect(max) {
            if (maxConnectTimes < max) {
                maxConnectTimes++
                mongoose.connect(db, {
                    useCreateIndex: true,
                    useNewUrlParser: true
                })
            } else {
                reject(err)
                throw new Error('数据库出现问题，程序无法搞定，请人为修理.....')
            }
        }
        mongoose.connection.on('disconnect', () => {
            console.log('***********数据库断开***********');
            maxconnect(3)
        })
        mongoose.connection.on('error', (err) => {
            console.log('***********数据库错误')
            maxconnect(3)
        })
        mongoose.connection.once('open', () => {
            console.log('MongoDB connected successfully')
            resolve()
        })
    })
}