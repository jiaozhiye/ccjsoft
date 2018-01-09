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
var normalize = require('normalize-path');

// 路由对象
var router = express.Router();
router.prefix = '/addarticle';

// 暴露路由模块
module.exports = router;

/*
 * GET /addarticle/insert
 */
router.post('/insert', function(req, res){
    // 文件夹名
    var imagedirname = 'images/article/';
    var filedirname  = 'files/';

    var pic_path = req.query.path != '' ? path.join(imagedirname, req.query.path) : '';
    var pic_thumb_path = pic_path != '' ? path.join(imagedirname, 'thumb_' + req.query.path) : '';

    // 临时数组
    var queryfpaths = [],
        tArr        = [];
    if (req.query.fpath != ''){
        queryfpaths = req.query.fpath.split(',');
    }
    for (var i = 0; i < queryfpaths.length; i++){
        tArr[i] = path.join(filedirname, queryfpaths[i]);
    }
    var file_paths = tArr.join(',');
    //console.log(file_paths);

    // 获取当前日期
    var time = dateFormat(new Date(), 'yyyymmddhhMMss');
    // 1. 插入文章内容
    db.execute('insert into zh_content (content, add_time, last_time) values (?, ?, ?)',
        [
            req.query.content,
            time,
            time
        ], function(rows){
            //console.log(rows);
            if (rows.affectedRows == 1){
                // 2. 插入其他信息
                db.execute('insert into zh_article ' +
                    ' (cid, title, description, content_id, attach_file, path, thumb_path, author, add_time, last_time) ' +
                    ' values ' +
                    ' (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [
                        req.query.classid,
                        req.query.title,
                        req.query.desc,
                        rows.insertId, // 外键
                        normalize(file_paths),
                        normalize(pic_path),
                        normalize(pic_thumb_path),
                        req.session.userid,
                        time,
                        time
                    ], function (rows){
                        //console.log(rows);
                        if (rows.affectedRows == 1){
                            if (pic_path != ''){ // 说明有图片上传
                                fs.stat(path.join(app.get('tempuploadpath'), req.query.path), function(err, stats){
                                    if (err){
                                        console.error(err);
                                        return;
                                    }
                                    if (stats.isFile()){
                                        // 移动图片文件
                                        fs.move(path.join(app.get('tempuploadpath'), req.query.path), path.join(app.get('articlepath'), req.query.path),
                                            function (err){
                                                if (err){
                                                    console.error(err);
                                                }
                                            });
                                    }
                                });
                                fs.stat(path.join(app.get('tempuploadpath'), 'thumb_' + req.query.path), function(err, stats){
                                    if (err){
                                        console.error(err);
                                        return;
                                    }
                                    if (stats.isFile()){
                                        fs.move(path.join(app.get('tempuploadpath'), 'thumb_' + req.query.path), path.join(app.get('articlepath'), 'thumb_' + req.query.path),
                                            function (err){
                                                if (err){
                                                    console.error(err);
                                                }
                                            });
                                    }
                                });
                            }
                            if (file_paths != ''){ // 说明有附件上传
                                for (var i = 0; i < queryfpaths.length; i++){
                                    var fpath = path.join(app.get('tempuploadpath'), queryfpaths[i]);
                                    if (fs.existsSync(fpath)){
                                        fs.move(fpath, path.join(app.get('filespath'), queryfpaths[i]), function (err){
                                            if (err){
                                                console.error(err);
                                            }
                                        });
                                    }
                                }
                            }
                            res.json({
                                errCode: 1,
                                errMsg: '文章信息添加成功'
                            });
                        } else {
                            res.json({
                                errCode: 0,
                                errMsg: '文章其他信息添加失败'
                            });
                        }
                    });
            } else {
                res.json({
                    errCode: 0,
                    errMsg: '文章信息添加失败'
                });
            }
        });
});