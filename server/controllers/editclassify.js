/**
 * @Author: jzy
 * @Date: 2017/1/11
 * @Last Modified by: jzy
 * @Last Modified time: 2017/1/11
 */
var app = require('../app.js');
var express = require('express');
var db = require('../models/db');
var path = require('path');
var fs = require('fs-extra');
var dateFormat = require('dateformat');

// 路由对象
var router = express.Router();
router.prefix = '/editclassify';

// 暴露路由模块
module.exports = router;

/*
 * GET /editclassify/del
 */
router.get('/del', function(req, res){
    db.execute('select count(*) total from zh_classify t1 where t1.pid = ?', [req.query.id], function(rows, fields){
        //console.log(rows);
        if (rows[0].total > 0){
            res.json({
                errCode: 0,
                errMsg: '分类删除失败，请先删除其下的子分类'
            });
        } else {
            db.execute('select t1.path, t1.thumb_path from zh_classify t1 where t1.id = ?', [req.query.id], function(rows){
                if (rows.length == 1){
                    // 删除分类图片文件
                    if (rows[0]['path'] != ''){
                        // 大图
                        fs.stat(path.join(app.get('uploadpath'), rows[0]['path']), function(err, stats){
                            if (err){
                                console.error(err);
                                return;
                            }
                            if (stats.isFile()){
                                fs.remove(path.join(app.get('uploadpath'), rows[0]['path']), function(err){
                                    if (err){
                                        console.error(err);
                                        return;
                                    }
                                });
                            }
                        });
                        // 缩略图
                        fs.stat(path.join(app.get('uploadpath'), rows[0]['thumb_path']), function(err, stats){
                            if (err){
                                console.error(err);
                                return;
                            }
                            if (stats.isFile()){
                                fs.remove(path.join(app.get('uploadpath'), rows[0]['thumb_path']), function(err){
                                    if (err){
                                        console.error(err);
                                        return;
                                    }
                                });
                            }
                        });
                    }

                    // 删除分类
                    db.execute('delete from zh_classify where id = ?', [req.query.id], function(rows){
                        //console.log(rows);
                        if (rows.affectedRows == 1){
                            res.json({
                                errCode: 1,
                                errMsg: '分类删除成功'
                            });
                        }
                    });
                } else {
                    res.json({
                        errCode: 0,
                        errMsg: '分类删除失败，分类不存在'
                    });
                }
            });
        }
    });
});

/*
 * GET /editclassify/order
 */
router.get('/order', function(req, res){
    // 获取当前日期
    var time = dateFormat(new Date(), 'yyyymmddhhMMss');
    db.execute('update zh_classify t1 set t1.last_time=?, t1.order_list=? where t1.id=?',
        [time, req.query.order, req.query.id],
        function(rows){
            //console.log(rows);
            if (rows.affectedRows == 1){
                res.json({
                    errCode: 1,
                    errMsg: '分类排序修改成功'
                });
            } else {
                res.json({
                    errCode: 0,
                    errMsg: '分类排序修改失败'
                });
            }
        });
});