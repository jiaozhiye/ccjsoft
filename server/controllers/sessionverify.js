/**
 * @Author: jzy
 * @Date: 2016/12/18
 * @Last Modified by: jzy
 * @Last Modified time: 2016/12/18
 */
var express = require('express');
var path = require('path');

// 路由对象
var router = express.Router();
router.prefix = '';

// 暴露路由模块
module.exports = router;

/*
 * GET /login
 */
router.get('/login', function(req, res){
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

/*
 * GET  /    /index    /*.html
 * 通过 session 校验登录 和 校验用户权限
 */
router.get(['/*.html', '/', '/index'], function(req, res, next){
    //console.log(req.url);
    if (!req.session.isLogin){ // 说明非法用户，没有登录
        return res.redirect('/login');
    } else { // 已登录，执行下一个中间件
        if (verify(req.url, req.session) == 1){
            next();
        } else {
            return res.sendFile(path.join(__dirname, '../public/src/noaccess/noaccess.template.html'));
        }
    }
});

/*
 * GET /    /index
 */
router.get(['/', '/index'], function(req, res){
    res.sendFile(path.join(__dirname, '../views/home.html'));
});

// session 校验方法
function verify(reqUrl, session){
    var isAccess = 1; // 假设默认有访问权限
    switch (reqUrl.substring(4)){
        case '/sysconfig/sysinfo/sysinfo.template.html':
            if (!session['sysinfo']) isAccess = 0;
            break;
        case '/sysconfig/globalconf/globalconf.template.html':
            if (!session['globalconf']) isAccess = 0;
            break;
        case '/database/dbcopy/dbcopy.template.html':
            if (!session['dbcopy']) isAccess = 0;
            break;
        case '/database/dbrestore/dbrestore.template.html':
            if (!session['dbrestore']) isAccess = 0;
            break;
        case '/group/add/add.template.html':
            if (!session['addgroup']) isAccess = 0;
            break;
        case '/group/edit/edit.template.html':
            if (!session['editgroup']) isAccess = 0;
            break;
        case '/user/add/add.template.html':
            if (!session['adduser']) isAccess = 0;
            break;
        case '/user/edit/edit.template.html':
            if (!session['edituser']) isAccess = 0;
            break;
        case '/classify/add/add.template.html':
            if (!session['addclassify']) isAccess = 0;
            break;
        case '/classify/edit/edit.template.html':
            if (!session['editclassify']) isAccess = 0;
            break;
        case '/article/add/add.template.html':
            if (!session['addarticle']) isAccess = 0;
            break;
        case '/article/edit/edit.template.html':
            if (!session['editarticle']) isAccess = 0;
            break;
        case '/appnav/add/add.template.html':
            if (!session['addnav']) isAccess = 0;
            break;
        case '/appnav/edit/edit.template.html':
            if (!session['editnav']) isAccess = 0;
            break;
        default:
            break;
    }
    return isAccess;
}