/**
 * @Author: jzy
 * @Date: 2017/1/15
 * @Last Modified by: jzy
 * @Last Modified time: 2017/1/15
 */
var app = require('../app.js');
var express = require('express');
var db = require('../models/db');
var path = require('path');
var fs = require('fs-extra');
var dateFormat = require('dateformat');

// 路由对象
var router = express.Router();
router.prefix = '/editarticle';

// 暴露路由模块
module.exports = router;

/*
 * GET /editarticle/total
 */
router.get('/total', function(req, res){
    db.execute('select count(t1.id) total from zh_article t1 where t1.disable = ?', [1], function (rows){
        //console.log(rows);
        if (rows.length && rows.length >= 1){
            res.json({
                errCode: 1,
                errMsg: '数据的总条数',
                total: rows[0].total
            });
        } else {
            res.json({
                errCode: 0,
                errMsg: '数据的总条数获取失败'
            });
        }
    });
});

/*
 * GET /editarticle/get
 */
router.get('/get', function(req, res){
    var curIndex = parseInt(req.query.curpage);
    var pageNum  = parseInt(req.query.pagenum);

    db.execute('select t1.id, t1.cid, t3.title classify, t1.title, t2.content, t4.username author, t1.last_time, t1.order_list ' +
        ' from zh_article t1 ' +
        ' left join zh_content t2 ' +
        ' on t1.content_id = t2.id ' +
        ' left join zh_classify t3 ' +
        ' on t1.cid = t3.id' +
        ' left join zh_user t4 ' +
        ' on t1.author = t4.id' +
        ' order by t1.id desc' +
        ' limit ?, ?',
        [(curIndex - 1) * pageNum, pageNum],
        function (rows){
            //console.log(rows);
            if (rows.length && rows.length > 0){
                res.json({
                    errCode: 1,
                    errMsg: '文章数据获取成功',
                    info: rows
                });
            } else {
                res.json({
                    errCode: 0,
                    errMsg: '文章数据获取失败',
                    info: []
                });
            }
        });
});

/*
 * GET /editarticle/order
 */
router.get('/order', function(req, res){
    //console.log(req.query);
    var id  = req.query.id,
        val = parseInt(req.query.order);
    db.execute('update zh_article t1 set t1.order_list=? where t1.id=?', [val, id], function(rows){
        //console.log(rows);
        if (rows.affectedRows == 1){
            res.json({
                errCode: 1,
                errMsg: '文章排序修改成功'
            });
        } else {
            res.json({
                errCode: 0,
                errMsg: '文章排序修改失败'
            });
        }
    });
});

/*
 * GET /editarticle/del
 */
router.get('/del', function(req, res){
    var id = req.query.id;
    if (id && id > 0){
        db.execute('select t1.attach_file fpaths, t1.path, t1.thumb_path from zh_article t1 where t1.id=?', [id], function(rows){
            if (rows.length == 1){
                if (rows[0].path != ''){
                    var pic_path = path.join(app.get('uploadpath'), rows[0].path);
                    var pic_thumb_path = path.join(app.get('uploadpath'), rows[0].thumb_path);
                    if (fs.existsSync(pic_path)){
                        fs.remove(pic_path, function (err){
                            if (err){
                                console.error(err);
                            }
                        });
                        fs.remove(pic_thumb_path, function (err){
                            if (err){
                                console.error(err);
                            }
                        });
                    }
                }

                if (rows[0].fpaths != ''){
                    var fpaths = rows[0].fpaths.split(',');
                    for (var i = 0; i < fpaths.length; i++){
                        var fpath = path.join(app.get('uploadpath'), fpaths[i]);
                        if (fs.existsSync(fpath)){
                            fs.remove(fpath, function (err){
                                if (err){
                                    console.error(err);
                                }
                            });
                        }
                    }
                }

                db.execute('delete t1, t2 from zh_article t1 ' +
                    ' left join zh_content t2 ' +
                    ' on t1.content_id = t2.id ' +
                    ' where t1.id = ?',
                    [id],
                    function(rows){
                        //console.log(rows.affectedRows);
                        if (rows.affectedRows == 2){
                            res.json({
                                errCode: 1,
                                errMsg: '删除文章信息成功'
                            });
                        } else {
                            res.json({
                                errCode: 0,
                                errMsg: '删除文章信息失败'
                            });
                        }
                    });
            }
        });
    } else {
        res.json({
            errCode: 0,
            errMsg: '参数有误'
        });
    }
});