const getRawBody = require('raw-body')
const wx = require('../common_lib/wx')

var wechat = {};

wechat.msg = function (ctx, next){
    console.log('get msg ok');
    console.log(ctx.request.body);
    var msg = ctx.request.body.xml;
    var content = '欢迎来到中二异次元！';
    var res = wx.message.text(msg,content);
    return ctx.body = res; 
};



module.exports = {
    'POST /': wechat.msg
};


