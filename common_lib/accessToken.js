const fs = require('fs')
const schedule = require('node-schedule')
const request = require('request')
const util = require('util')
const wxconfig = require('../config/wxconfig.json')

var f = {}

var refreshAccessToken = () => {
    var access_token;
    var data = fs.readFileSync('./config/access_token.json');
    access_token = JSON.parse(data); 
    if (access_token === undefined){
        return;
    }
    //提前200秒读取
    if ((access_token.timestamp - Date.now()) <= 2000 ) {
        var accessToeknUrl = wxconfig.apiUrl.accessToken;
        var wechat = wxconfig.wechat;
        accessToeknUrl = util.format(accessToeknUrl,'https://api.weixin.qq.com/',wechat.appID,wechat.appSecret);
        var options = {
            url: accessToeknUrl
        };
        request.get(options, function(err, response, body){
            console.log(response.body)
        });
    }

}

f.refreshToken = () => {
    //每分钟的0秒执行
    // schedule.scheduleJob('0 * * * * *', function(){
    //     console.log("get access_token");
    // });
    refreshAccessToken();
};

f.getAccessToken = () => {

};


module.exports = f