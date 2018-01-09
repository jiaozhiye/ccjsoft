/**
 * @Author: Jzy
 * @Date: 2016/12/16
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/12/16
 */
var express = require('express');
var db = require('../models/db');

// 路由对象
var router = express.Router();
router.prefix = '/edituser';

// 暴露路由模块
module.exports = router;

/*
 * GET /edituser/get
 */
router.get('/get', function(req, res){
    db.execute('select t1.id, t1.username, t2.name groupname, t1.last_sign_time last_login, t1.user_group_id gid, t1.disable ' +
        ' from zh_user t1 left join zh_user_group t2 on t1.user_group_id=t2.id ' +
        ' where t2.disable=?',
        [1],
        function(rows){
            //console.log(rows);
            if (rows.length && rows.length > 0){
                res.json({
                    errCode: 1,
                    errMsg: '所有用户信息获取成功',
                    info: rows
                });
            } else {
                res.json({
                    errCode: 0,
                    errMsg: '用户信息获取失败',
                    info: []
                });
            }
        });
});

/*
 * GET /edituser/del
 */
router.get('/del', function(req, res){
    var id = req.query.id;
    if (id && id > 0){
        db.execute('delete from zh_user where id=?', [id], function(rows){
            //console.log(rows);
            if (rows.affectedRows == 1){
                res.json({
                    errCode: 1,
                    errMsg: '用户删除成功'
                });
            } else {
                res.json({
                    errCode: 0,
                    errMsg: '用户删除失败'
                });
            }
        });
    } else {
        res.json({
            errCode: 0,
            errMsg: '删除用户参数有误'
        });
    }
});