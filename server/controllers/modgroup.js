/**
 * @Author: Jzy
 * @Date: 2016/12/16
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/12/16
 */
var express = require('express');
var db = require('../models/db');
var dateFormat = require('dateformat');

// 路由对象
var router = express.Router();
router.prefix = '/modgroup';

// 暴露路由模块
module.exports = router;

/*
 * GET /modgroup/getone
 */
router.get('/getone', function (req, res) {
    var id = req.query.id;
    if (id && id > 0) {

        //SELECT t1.id, t1.name, t1.description, t1.disable, t3.name nav_name, t2.site_nav_mark mark, t2.access, t2.disable nav_disable
        //FROM zh_user_group t1 LEFT JOIN zh_site_access t2
        //ON t1.id=t2.user_group_id LEFT JOIN zh_site_nav t3 ON t2.site_nav_mark=t3.mark
        //WHERE t1.id=27 AND t2.disable=1

        db.execute('SELECT t1.id, t1.name, t1.description, t1.disable, t3.name nav_name, t2.site_nav_mark mark, t2.access, t2.disable nav_disable ' +
            ' FROM zh_user_group t1 LEFT JOIN zh_site_access t2 ' +
            ' ON t1.id=t2.user_group_id ' +
            ' LEFT JOIN zh_site_nav t3 ' +
            ' ON t2.site_nav_mark=t3.mark ' +
            ' WHERE t1.id=? AND t2.disable=? ' +
            ' ORDER BY t2.id ASC', [id, 1],
            function (rows) {
                //console.log(rows);
                if (rows.length && rows.length > 0) {
                    res.json({
                        errCode: 1,
                        errMsg: '用户组及权限信息获取成功',
                        info: rows
                    });
                } else {
                    res.json({
                        errCode: 0,
                        errMsg: '用户组及权限信息获取失败',
                        info: []
                    });
                }
            });
    } else {
        res.json({
            errCode: 0,
            errMsg: '获取用户组参数有误',
            info: []
        });
    }
});

/*
 * GET /modgroup/update
 */
router.post('/update', function (req, res) {
    var params = req.query;
    if (params.id && params.id > 0) {
        // 获取当前日期
        var time = dateFormat(new Date(), 'yyyymmddhhMMss');

        db.execute('update zh_user_group t1 set t1.name=?, t1.description=?, t1.last_time=?, t1.disable=? ' +
            ' where t1.id=?', [params.name, params.description, time, params.disable, params.id],
            function (rows) {
                //console.log(rows);
                if (rows.affectedRows == 1) {

                    (function fn(i) {
                        if (params.conf.length == i) {
                            return res.json({
                                errCode: 1,
                                errMsg: '用户组信息更新成功'
                            });
                        }
                        var obj = JSON.parse(params.conf[i]);
                        db.execute('update zh_site_access t1 ' +
                            ' set t1.access=?' +
                            ' where t1.user_group_id=? and t1.site_nav_mark=?',
                            [obj.access, params.id, obj.mark],
                            function (rows) {
                                if (rows.affectedRows == 1) {
                                    // 更新 session 的值
                                    req.session[obj.mark] = obj.access;
                                    fn(++i);
                                } else {
                                    res.json({
                                        errCode: 0,
                                        errMsg: '用户组信息和权限更新失败'
                                    });
                                }
                            });
                    })(0);

                } else {
                    res.json({
                        errCode: 0,
                        errMsg: '用户组信息更新失败'
                    });
                }
            });
    } else {
        res.json({
            errCode: 0,
            errMsg: '更新用户组参数有误'
        });
    }
});
