/**
 * @Author: Jzy
 * @Date: 2016/12/15
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/12/15
 */
var express = require('express');
var db = require('../models/db');
var dateFormat = require('dateformat');
var md5 = require('md5');

// 路由对象
var router = express.Router();
router.prefix = '/adduser';

// 暴露路由模块
module.exports = router;

/*
 * GET /adduser/getgroup
 */
router.get('/getgroup', function(req, res){
    db.execute('select t1.id, t1.name from zh_user_group t1 where t1.disable=?', [1], function(rows){
        if (rows.length && rows.length > 0){
            res.json({
                errCode: 1,
                errMsg: '用户组信息获取成功',
                info: rows
            });
        } else {
            res.json({
                errCode: 0,
                errMsg: '获取用户组信息获取失败',
                info: []
            });
        }
    });
});

/*
 * GET /adduser/insert
 */
router.post('/insert', function(req, res){
    //console.log(req.query);
    var params = req.query;
    if (params.password1 !== params.password2){
        res.json({
            errCode: 0,
            errMsg: '密码不一致'
        });
    } else {
        // 获取当前日期
        var time = dateFormat(new Date(), 'yyyymmddhhMMss');

        db.execute('insert into zh_user (username, password, email, add_time, last_sign_time, disable, user_group_id) ' +
            ' values (?, ?, ?, ?, ?, ?, ?)',
            [params.username, md5(params.password2), params.email, time, time, 1, params.user_group_id],
            function(rows){
                //console.log(rows);
                if (rows.affectedRows == 1){ // 添加成功
                    res.json({
                        errCode: 1,
                        errMsg: '用户添加成功'
                    });
                } else {
                    res.json({
                        errCode: 0,
                        errMsg: '用户添加失败'
                    });
                }
            });
    }
});