/**
 * @Author: Jzy
 * @Date: 2016/12/16
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/12/16
 */
var express = require('express');
var db = require('../models/db');
var dateFormat = require('dateformat');
var md5 = require('md5');

// 路由对象
var router = express.Router();
router.prefix = '/moduser';

// 暴露路由模块
module.exports = router;

/*
 * GET /moduser/getone
 */
router.get('/getone', function(req, res){
    var id = req.query.id;
    if (id && id > 0){
        db.execute('select t1.id, t1.username, t1.email, t1.user_group_id gid, t1.disable ' +
            ' from zh_user t1 where t1.id=?',
            [id],
            function(rows){
                //console.log(rows);
                if (rows.length && rows.length > 0){
                    res.json({
                        errCode: 1,
                        errMsg: '用户信息获取成功',
                        info: rows[0]
                    });
                } else {
                    res.json({
                        errCode: 0,
                        errMsg: '用户信息获取失败',
                        info: {}
                    });
                }
            });
    } else {
        res.json({
            errCode: 0,
            errMsg: '获取用户信息参数有误',
            info: []
        });
    }
});

/*
 * GET /moduser/update
 */
router.post('/update', function(req, res){
    var params = req.query;
    if (params.password1 !== params.password2){
        res.json({
            errCode: 0,
            errMsg: '密码不一致'
        });
    } else {
        // 获取当前日期
        var time = dateFormat(new Date(), 'yyyymmddhhMMss');

        db.execute('update zh_user t1 set t1.username=?, t1.password=?, t1.email=?, t1.last_sign_time=?, t1.disable=?, t1.user_group_id=? ' +
            ' where t1.id=?',
            [params.username, md5(params.password2), params.email, time, params.disable, params.user_group_id, params.id],
            function(rows){
                // console.log(rows);
                if (rows.affectedRows == 1){
                    res.json({
                        errCode: 1,
                        errMsg: '用户信息更新成功'
                    });
                } else {
                    res.json({
                        errCode: 0,
                        errMsg: '用户信息更新失败'
                    });
                }
            });
    }
});
