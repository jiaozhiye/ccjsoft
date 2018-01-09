/**
 * @Author: jzy
 * @Date: 2016/12/10
 * @Last Modified by: jzy
 * @Last Modified time: 2016/12/10
 */
var path = require('path');
var express = require('express');
var app = express();
var db = require('./server/models/db2');


// 静态资源服务
app.use('/', express.static(path.join(__dirname, 'client')));
var templateUrl = path.join(__dirname, 'client');

// ==============================

// 路由中间件  -  首页
app.get(['/', '/index'], function(req, res){
    return res.sendFile(templateUrl + '/index.html');
});

// 路由中间件  -  师资力量
app.get('/teacher', function(req, res){
    return res.sendFile(templateUrl + '/teacher.html');
});

// 路由中间件  -  课程教程列表页
app.get('/course', function(req, res){
    return res.sendFile(templateUrl + '/course.html');
});

// 路由中间件  -  列表页
app.get('/list/:id', function(req, res){
    if (!(typeof req.params.id != 'undefined' && req.params.id > 0)){
        return res.sendFile(templateUrl + '/err.html');
    }
    return res.sendFile(templateUrl + '/list.html');
});

// 路由中间件  -  课程教程详情页
app.get('/courseView/:id', function(req, res){
    if (!(typeof req.params.id != 'undefined' && req.params.id > 0)){
        return res.sendFile(templateUrl + '/err.html');
    }
    return res.sendFile(templateUrl + '/courseView.html');
});

// 路由中间件  -  详情页
app.get('/view/:id', function(req, res){
    if (!(typeof req.params.id != 'undefined' && req.params.id > 0)){
        return res.sendFile(templateUrl + '/err.html');
    }
    return res.sendFile(templateUrl + '/view.html');
});

// ==============================

// error 处理
app.use(function(err, req, res, next){
    console.error(err.stack);
    return res.status(500).send('Something broke!');
});

// 404
app.use(function(req, res){
    return res.status(404).sendFile(templateUrl + '/err.html');
});

// 处理监听
var hostname = '127.0.0.1';
var port     = process.env.PORT || 3000;

app.listen(port, function (err){
    if (err){
        throw err;
    }
    app.set('url', 'http://' + hostname + ':' + port);
    console.log('Server running at http://' + hostname + ':' + port + '/');
});
