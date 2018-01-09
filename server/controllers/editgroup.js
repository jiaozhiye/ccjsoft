/**
 * @Author: Jzy
 * @Date: 2016/12/17
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/12/17
 */
var express = require('express');
var db = require('../models/db');

// 路由对象
var router = express.Router();
router.prefix = '/editgroup';

// 暴露路由模块
module.exports = router;

/*
 * GET /editgroup/get
 */
router.get('/get', function(req, res){
    db.execute("select t1.* from zh_user_group t1",
    function(rows){
        //console.log(rows);
        if (rows.length && rows.length > 0){
            res.send({
                errCode: 1,
                errMsg: '用户组信息获取成功',
                info: rows
            });
        } else {
            res.send({
                errCode: 0,
                errMsg: '用户组信息获取失败',
                info: []
            });
        }
    });
});

/*
 * GET /editgroup/del
 */
router.get('/del', function(req, res){
    var id = req.query.id;
    if (id && id > 0){
        //DELETE t1, t2 FROM `zh_user_group` t1
        //LEFT JOIN `zh_site_access` t2 ON t1.id=t2.user_group_id
        //WHERE t1.id=30
        db.execute('delete t1, t2 from zh_user_group t1 ' +
            ' left join zh_site_access t2 on t1.id=t2.user_group_id ' +
            ' where t1.id=?',
            [id],
            function(rows){
                //console.log(rows);
                if (rows.affectedRows > 0){ // 同时删除两个表中的数据，所以 affectedRows 大于 1
                    res.json({
                        errCode: 1,
                        errMsg: '用户组删除成功'
                    });
                } else {
                    res.json({
                        errCode: 0,
                        errMsg: '用户组删除失败'
                    });
                }
            });
    } else {
        res.json({
            errCode: 0,
            errMsg: '删除用户组参数有误'
        });
    }
});
