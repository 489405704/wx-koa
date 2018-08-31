const Koa = require('koa')

const wxAuthUtil = require('./common_lib/wxAuthUtil')
const wxconfig = require('./config/wxconfig.json')
const controller = require('./controller')
const bodyParser = require('koa-bodyparser')
const xmlParser = require('koa-xml-body')
const accessToken = require('./common_lib/accessToken')

const app = new Koa() 

//刷新access_token
accessToken.refreshToken();

app.use(xmlParser());
app.use(bodyParser());

//微信认证中间件
app.use(wxAuthUtil.sign(wxconfig));


app.use(controller());

app.listen(3000);