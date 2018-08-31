const sha1 = require('sha1')

var utils = {}

var getSignature = (timestamp, nonce, token, signature) => {
    const arr = [token, timestamp, nonce].sort().join('');

    var sha = sha1(arr);

    if (sha === signature) {
        return true; 
    }

    return false;
}

utils.sign = config => {
    //转交给koa监听
    return async function(ctx, next){

        const {signature, timestamp, nonce, echostr} = ctx.query;
        var token = config.wechat.token;

        if (ctx.method === 'GET') {
            console.log('wx auth begin')

            if (getSignature(timestamp, nonce, token,signature)) {
                console.log("msg is return ")
                return ctx.body = echostr
            }
        }else if (ctx.method === 'POST') {
            //同样验证是否来自微信,来自微信放行消息
            if (!getSignature(timestamp, nonce, token,signature)){
                ctx.status = 401;
                return ctx.body = 'invalid signature';
            }
        }

        await next();
    }
    

}


module.exports = utils;