/**
 * @Author: jzy
 * @Date: 2017/7/3
 * @Last Modified by: jzy
 * @Last Modified time: 2017/7/3
 */
var express = require('express');
var db = require('../models/db');
var dateFormat = require('dateformat');

// 路由对象
var router = express.Router();
router.prefix = '/modnav';

// 暴露路由模块
module.exports = router;

/*
 * GET /modnav/getone
 */
router.get('/getone', function(req, res){
    db.execute('select t1.id, t1.pid, t1.name, t1.mark, t1.disable from zh_site_nav t1 where t1.id=?', [req.query.id], function(rows){
        //console.log(rows);
        if (rows.length > 0){
            res.json({
                errCode: 1,
                errMsg: '导航信息获取成功',
                info: rows[0]
            });
        } else {
            res.json({
                errCode: 0,
                errMsg: '导航信息获取失败',
                info: {}
            });
        }
    });
});

/*
 * GET /modnav/update
 */
router.get('/update', function(req, res){
    //console.log(req.query);
    db.execute('select t1.mark from zh_site_nav t1 where t1.pid!=? and t1.id!=?', [0, req.query.id], function(rows){
        //console.log(rows);
        if (rows.length > 0){
            var index = -1;
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].mark == req.query.mark) {
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
                    db.execute('update zh_site_nav t1 set ' +
                        ' t1.pid=?, t1.depth=?, t1.name=?, t1.link=?, t1.mark=?, t1.last_time=?, t1.disable=? ' +
                        ' where t1.id=?',
                        [
                            req.query.pid,
                            '0',
                            req.query.name,
                            '',
                            '',
                            time,
                            req.query.disable,
                            req.query.id
                        ],
                        function(rows){
                            //console.log(rows);
                            if (rows.affectedRows == 1){
                                res.json({
                                    errCode: 1,
                                    errMsg: '导航修改成功'
                                });
                            } else {
                                res.json({
                                    errCode: 0,
                                    errMsg: '导航修改失败'
                                });
                            }
                        });
                } else {
                    db.execute('select t1.depth, t1.mark from zh_site_nav t1 where t1.id=?', [req.query.id], function(rows){
                        //console.log(rows);
                        if (rows.length == 1){
                            var pdepath = rows[0].depth.split('-')[0],
                                oldmark = rows[0].mark;

                            // 获取当前日期
                            var time = dateFormat(new Date(), 'yyyymmddhhMMss');
                            db.execute('update zh_site_nav t1 set ' +
                                ' t1.pid=?, t1.depth=?, t1.name=?, t1.link=?, t1.mark=?, t1.last_time=?, t1.disable=? ' +
                                ' where t1.id=?',
                                [
                                    req.query.pid,
                                    pdepath + '-' + req.query.pid,
                                    req.query.name,
                                    '#!/' + req.query.mark,
                                    req.query.mark,
                                    time,
                                    req.query.disable,
                                    req.query.id
                                ],
                                function(rows){
                                    //console.log(rows);
                                    if (rows.affectedRows == 1){
                                        db.execute('update zh_site_access t1 set ' +
                                            ' t1.site_nav_mark=?, t1.last_time=? ' +
                                            ' where t1.site_nav_mark=?',
                                            [
                                                req.query.mark,
                                                time,
                                                oldmark
                                            ],
                                            function(rows){
                                                if (rows.affectedRows == 1){
                                                    res.json({
                                                        errCode: 1,
                                                        errMsg: '导航修改成功'
                                                    });
                                                }
                                            });
                                    } else {
                                        res.json({
                                            errCode: 0,
                                            errMsg: '导航修改失败'
                                        });
                                    }
                                });
                        }
                    });
                }

            }
        }
    });

});