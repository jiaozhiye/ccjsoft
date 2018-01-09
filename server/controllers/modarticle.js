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
router.prefix = '/modarticle';

// 暴露路由模块
module.exports = router;

/*
 * GET /modarticle/get
 */
router.get('/get', function(req, res){
    db.execute('select t1.id, t1.cid, t2.title cname, t1.title, t1.description, t3.content, t1.attach_file files, t1.path pic_path, t1.thumb_path pic_thumb_path, t1.disable ' +
        ' from zh_article t1 ' +
        ' left join zh_classify t2 ' +
        ' on t1.cid = t2.id ' +
        ' left join zh_content t3 ' +
        ' on t1.content_id = t3.id ' +
        ' where t1.id=?',
        [req.query.id],
        function(rows){
            //console.log(rows);
            if (rows.length == 1){
                rows[0].files = rows[0].files != '' ? rows[0].files.split(',') : [];
                res.json({
                    errCode: 1,
                    errMsg: '文章信息获取成功',
                    info: rows[0]
                });
            } else {
                res.json({
                    errCode: 0,
                    errMsg: '文章信息获取失败',
                    info: []
                });
            }
        });
});

/*
 * POST /modarticle/update
 */
router.post('/update', function(req, res){
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

    var time = dateFormat(new Date(), 'yyyymmddhhMMss');

    db.execute('update zh_article t1 left join zh_content t2 on t1.content_id=t2.id ' +
        ' set t1.cid=?, t1.title=?, t1.description=?, t2.content=?, t1.attach_file=?, t1.path=?, t1.thumb_path=?, t1.last_time=?, t2.last_time=?, t1.disable=? ' +
        ' where t1.id=?',
        [
            req.query.cid,
            req.query.title,
            req.query.desc,
            req.query.content,
            normalize(file_paths),
            normalize(pic_path),
            normalize(pic_thumb_path),
            time,
            time,
            req.query.disable,
            req.query.id
        ],
        function(rows){
            //console.log(rows);
            if (rows.affectedRows == 2){
                if (pic_path != ''){ // 说明有图片上传
                    fs.stat(path.join(app.get('tempuploadpath'), req.query.path), function(err, stats){
                        if (err){
                            //console.error(err);
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
                            //console.error(err);
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
                    errMsg: '文章数据更新陈功'
                });
            } else {
                res.json({
                    errCode: 0,
                    errMsg: '文章数据更新失败'
                });
            }
        });
});

/*
 * GET /modarticle/delfile
 */
router.get('/delfile', function(req, res){
    if (typeof req.query.paths == 'undefined'){
        return res.json({
            errCode: 0,
            errMsg: '文件不存在'
        });
    }
    var fpaths = req.query.paths.split(',');
    var removeFn = function(i){
        if (i >= fpaths.length){
            return res.json({
                errCode: 1,
                errMsg: '文件删除成功'
            });
        } else {
            var fpath = path.join(app.get('uploadpath'), fpaths[i]);
            if (fs.existsSync(fpath)){
                fs.remove(fpath, function (err){
                    if (err){
                        console.error(err);
                    }
                    removeFn(++i);
                });
            } else {
                removeFn(++i);
            }
        }
    };
    removeFn(0);
});