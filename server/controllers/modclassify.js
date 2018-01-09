/**
 * @Author: jzy
 * @Date: 2017/1/8
 * @Last Modified by: jzy
 * @Last Modified time: 2017/1/8
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
router.prefix = '/modclassify';

// 暴露路由模块
module.exports = router;

/*
 * GET /modclassify/get
 */
router.get('/get', function(req, res){
    db.execute('select t1.id, t1.pid, t1.title, t1.description, t1.arc_pic_size arcpicsize, t1.path, t1.thumb_path, t1.disable ' +
        ' from zh_classify t1 ' +
        ' where t1.id=?',
        [req.query.id],
        function(rows){
            //console.log(rows);
            if (rows.length > 0){
                res.json({
                    errCode: 1,
                    errMsg: '指定分类信息获取成功',
                    info: rows[0]
                });
            } else {
                res.json({
                    errCode: 0,
                    errMsg: '指定分类信息获取失败',
                    info: {}
                });
            }
        });
});

/*
 * GET /modclassify/update
 */
router.post('/update', function(req, res){
    //console.log(req.query);
    // 文件夹名
    var uploadfoldername = 'images/classify';
    // 大图路径
    var file_path = req.query.path != '' ? path.join(uploadfoldername, req.query.path) : '';
    // 缩略图路径
    var file_thumb_path = file_path != '' ? path.join(uploadfoldername, 'thumb_' + req.query.path) : '';

    db.execute('select t1.depth from zh_classify t1 where t1.id=?', [req.query.id], function(rows){
        var guild = rows[0].depth + '-' + req.query.id;
        var oReg  = new RegExp('^' + guild);
        //console.log(oReg);

        // select 其所属父类
        db.execute('select t1.depth from zh_classify t1 where t1.id=?', [req.query.pid], function(rows){
            //console.log(rows);
            // 说明所属父类是其子分类，不满足规则
            if ((rows.length > 0 && rows[0].depth.search(oReg) != -1) || req.query.id == req.query.pid){
                return res.json({
                    errCode: 0,
                    errMsg: '不能将类别移动到自己或自己的子类中去'
                });
            }

            // 父类的 depth
            var pdepth = '';
            if (rows.length > 0){
                pdepth = rows[0].depth + '-';
            }

            // 获取当前日期
            var time = dateFormat(new Date(), 'yyyymmddhhMMss');

            // 分类图片无更新
            db.execute('update zh_classify t1 set ' +
                ' t1.pid=?, t1.depth=?, t1.title=?, t1.description=?, t1.arc_pic_size=?, t1.path=?, t1.thumb_path=?, t1.last_time=?, t1.disable=? ' +
                ' where t1.id=?',
                [
                    req.query.pid,
                    pdepth + req.query.pid,
                    req.query.title,
                    req.query.description,
                    req.query.arcpicsize,
                    normalize(file_path),
                    normalize(file_thumb_path),
                    time,
                    req.query.disable,
                    req.query.id
                ],
                function(rows){
                    if (rows.affectedRows == 1){
                        if (file_path != '') { // 说明有图片上传
                            // 移动图片文件
                            fs.stat(path.join(app.get('tempuploadpath'), req.query.path), function(err, stats){
                                if (err){
                                    //console.error(err);
                                    return;
                                }
                                if (stats.isFile()){
                                    // 移动图片文件
                                    fs.move(path.join(app.get('tempuploadpath'), req.query.path), path.join(app.get('classifypath'), req.query.path),
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
                                    fs.move(path.join(app.get('tempuploadpath'), 'thumb_' + req.query.path), path.join(app.get('classifypath'), 'thumb_' + req.query.path),
                                        function (err){
                                            if (err){
                                                console.error(err);
                                            }
                                        });
                                }
                            });
                        }

                        // 修改子分类
                        modChildClassify(guild, pdepth + req.query.pid + '-' + req.query.id);

                        res.json({
                            errCode: 1,
                            errMsg: '分类修改成功'
                        });
                    } else {
                        res.json({
                            errCode: 1,
                            errMsg: '分类修改失败'
                        });
                    }
                });

        });
    });
});

// 修改子分类
var modChildClassify = function(oldDepth, newDepth){
    db.execute('select t1.id, t1.depth from zh_classify t1 where t1.depth like ?', [oldDepth + '%'], function(rows){
        for (var i = 0; i < rows.length; i++){
            var depth = rows[i].depth.replace(oldDepth, newDepth);
            db.execute('update zh_classify t1 set t1.depth=? where t1.id=?', [depth, rows[i].id], function(rows){
                // ...
            });
        }
    });
};

/*
 * GET /modclassify/delfile
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