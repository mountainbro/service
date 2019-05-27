const fs = require('fs');
const Router = require('koa-router');

const router = new Router();

function addRule(router,rules){
    for (let item in rules){
        if (item.startsWith('GET ')){
            let path = item.substring(4)
            router.get(path,rules[item])
        }else if (item.startsWith('POST ')){
            let path = item.substring(5)
            router.post(path,rules[item])
        }else{
            console.log(`invalid URl ${item}`)
        }
    }
}
function addRules(router){
    let files = fs.readdirSync(__dirname + '/controller');
    let js_files = files.filter(i=>i.endsWith('.js'));
    for (let js of js_files){

        let rule = require(__dirname + '/controller/' + js);
        
        addRule(router,rule);
    }
}

module.exports = function () {
    addRules(router);
    return router.routes();
};