/**
 * @Author: jzy
 * @Date: 2016/12/10
 * @Last Modified by: jzy
 * @Last Modified time: 2016/12/10
 */
var express = require('express');
var bodyParser = require('body-parser');
var glob = require('glob');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');
var app = express();

// 向外暴露 express app 模块
module.exports = app;

// session 配置
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

// cookie 配置
app.use(cookieParser());

// 处理 application/x-www-form-urlencoded -> form表单提交的 POST 数据
app.use(bodyParser.urlencoded({extended: true}));

// 文件上传目录
app.set('uploadpath', path.join(__dirname, '/uploads'));
// 数据库备份路径
app.set('databasepath', path.join(__dirname, '/uploads/data'));
// 临时上传路径
app.set('tempuploadpath', path.join(__dirname, '/uploads/temp'));
// 分类图片上传路径
app.set('classifypath', path.join(__dirname, '/uploads/images/classify'));
// 文章图片上传路径
app.set('articlepath', path.join(__dirname, '/uploads/images/article'));
// 附件上传路径
app.set('filespath', path.join(__dirname, '/uploads/files'));

// 允许前台请求域
app.set('originUrl', '*');
//app.set('originUrl', 'http://127.0.0.1:3000');

// 登录、权限 校验中间件    一定确保是第一个中间件
app.use('/', require('./controllers/sessionverify'));

// 静态资源服务
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'uploads')));

// 同步载入所有路由控制器，返回文件路径数组
var routes = glob.sync('./controllers/**/*.js', {cwd: __dirname});
for (var i = 0, len = routes.length; i < len; i++){
    var router = require(routes[i]);
    // 只有请求地址为 router.prefix/* 类型, 才会由 router 路由对象来处理
    router.prefix && app.use(router.prefix, router);
	// 释放临时变量
    router = null;
}

// error 处理    错误处理器中间件并不捕获 404
app.use(function(err, req, res, next){
    console.error(err.stack);
    return res.status(500).send('Something broke!');
});

// 404
app.use(function(req, res){
    return res.status(404).sendFile(path.join(__dirname, 'views/err.html'));
});

// 处理监听
if (!module.parent){
    var hostname = '127.0.0.1';
    var port     = process.env.PORT || 2080;
    app.listen(port, function (err){
        if (err) throw err;
        app.set('url', 'http://' + hostname + ':' + port);
        console.log('Server running at http://' + hostname + ':' + port + '/');
    });
}
