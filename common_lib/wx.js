const xmlTool = require('./xmlTool')

//微信被动回复消息api
var message = {}

//文本消息
message.text = (msg, content) => {
    return xmlTool.json2Xml({
        xml: {
            ToUserName: msg.FromUserName,
            FromUserName: msg.ToUserName,
            CreateTime: Date.now(),
            MsgType: msg.MsgType,
            Content: content
        }
    });
};



module.exports = {
    message : message
}