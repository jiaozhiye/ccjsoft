/**
 * @Author: jzy
 * @Date: 2017/7/2
 * @Last Modified by: jzy
 * @Last Modified time: 2017/7/2
 */
var express = require('express');
var db = require('../models/db');
var dateFormat = require('dateformat');

// 路由对象
var router = express.Router();
router.prefix = '/addnav';

// 暴露路由模块
module.exports = router;

/*
 * GET /addnav/get
 */
router.get('/get', function(req, res){
    db.execute('select t1.id, t1.pid, t1.name, t1.order_list, t1.disable from zh_site_nav t1 ' +
        ' where t1.pid=? order by t1.order_list asc', [0], function(rows){
        //console.log(rows);
        if (rows.length > 0){
            for (var i = 0, len = rows.length; i < len; i++){
                if (i == len - 1){
                    rows[i].name = '┗ ' + rows[i].name;
                } else {
                    rows[i].name = '┣ ' + rows[i].name;
                }
            }

            rows.unshift({
                id: 0,
                name: '应用根导航',
                order_list: 0,
                disable: 1
            });

            res.json({
                errCode: 1,
                errMsg: '导航获取成功',
                info: rows
            });
        } else {
            res.json({
                errCode: 0,
                errMsg: '导航获取失败',
                info: []
            });
        }
    });
});

/*
 * GET /addnav/add
 */
router.get('/add', function(req, res){
    db.execute('select t1.mark from zh_site_nav t1 where t1.pid!=?', [0], function(rows){
        //console.log(rows);
        if (rows.length > 0){
            var index = -1;
            for (var i = 0; i < rows.length; i++){
                if (rows[i].mark == req.query.mark){
                    index++;
                }
            }
            if (index > -1){
                res.json({
                    errCode: 0,
                    errMsg: '导航mark值是唯一的，不能重复'
                });
            } else {

                if (req.query.pid == 0){ // 说明是根导航
                    // 获取当前日期
                    var time = dateFormat(new Date(), 'yyyymmddhhMMss');
                    db.execute('insert into zh_site_nav ' +
                        ' (pid, depth, name, link, mark, add_time, last_time, order_list, disable) ' +
                        ' values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                        [
                            req.query.pid,
                            '0',
                            req.query.name,
                            '',
                            '',
                            time,
                            time,
                            10,
                            1
                        ],
                        function(rows){
                            //console.log(rows);
                            if (rows.affectedRows == 1){
                                res.json({
                                    errCode: 1,
                                    errMsg: '根导航添加成功'
                                });
                            } else {
                                res.json({
                                    errCode: 0,
                                    errMsg: '根导航添加失败'
                                });
                            }
                        });
                } else {
                    db.execute('select t1.depth from zh_site_nav t1 where t1.id=?', [req.query.pid], function(rows){
                        //console.log(rows);
                        if (rows.length == 1){
                            var pdepath = rows[0].depth;
                            // 获取当前日期
                            var time = dateFormat(new Date(), 'yyyymmddhhMMss');
                            db.execute('insert into zh_site_nav ' +
                                ' (pid, depth, name, link, mark, add_time, last_time, order_list, disable) ' +
                                ' values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                                [
                                    req.query.pid,
                                    pdepath + '-' + req.query.pid,
                                    req.query.name,
                                    '#!/' + req.query.mark,
                                    req.query.mark,
                                    time,
                                    time,
                                    0,
                                    1
                                ],
                                function(rows){
                                    //console.log(rows);
                                    if (rows.affectedRows == 1){
                                        // 添加权限控制，默认有该分类权限
                                        db.execute('select t1.id, t1.user_group_id gid from zh_user t1 where t1.id=?', [req.session.userid], function(rows){
                                            if (rows.length == 1){
                                                // 获取当前日期
                                                var time = dateFormat(new Date(), 'yyyymmddhhMMss');
                                                var gid  = rows[0].gid;
                                                db.execute('insert into zh_site_access ' +
                                                    ' (user_group_id, site_nav_mark, access, add_time, last_time, disable) ' +
                                                    ' values (?, ?, ?, ?, ?, ?)',
                                                    [
                                                        gid,
                                                        req.query.mark,
                                                        1,
                                                        time,
                                                        time,
                                                        1
                                                    ],
                                                    function(rows){
                                                        if (rows.affectedRows == 1){
                                                            res.json({
                                                                errCode: 1,
                                                                errMsg: '导航及权限添加成功'
                                                            });
                                                        } else {
                                                            res.json({
                                                                errCode: 0,
                                                                errMsg: '导航添加成功，权限添加失败'
                                                            });
                                                        }
                                                    });
                                            }
                                        });
                                    } else {
                                        res.json({
                                            errCode: 0,
                                            errMsg: '导航添加失败'
                                        });
                                    }
                                });
                        }
                    });
                }

            }
        } else {
            res.json({
                errCode: 0,
                errMsg: '导航检索失败'
            });
        }
    });

});

