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
router.prefix = '/addclassify';

// 暴露路由模块
module.exports = router;

/*
 * GET /addclassify/get
 */
router.get('/get', function(req, res){
    db.execute('select t1.id, t1.pid, t1.title, t1.arc_pic_size size, t1.last_time, t1.order_list, t1.disable, CONCAT_WS(?, t1.depth, CAST(t1.id AS char)) absdepth ' +
        ' from zh_classify t1 ' +
        ' order by absdepth asc',
        ['-'],
        function(rows){
            // 重新排序, 解决 sql 排序 0-10 排在 0-9 之前的问题
            //rows.sort(function(a, b){
            //    return a.absdepth.split('-')[1] - b.absdepth.split('-')[1];
            //});
            // 处理 absdepth
            for (var i = 0; i < rows.length; i++){
                rows[i].absdepth = rows[i].absdepth.split('-').length - 2;
            }

            //loadByDepth(rows, 0);
            loadByPid(rows, 0);

            rows.unshift({
                id: 0,
                title: '应用根分类',
                disable: 1
            });
            //console.log(rows);

            res.json({
                errCode: 1,
                errMsg: '分类获取成功',
                info: rows
            });
        });

    // 递归方法
    function loadByPid(arr, pid){
        var tArr = [];
        for (var i = 0; i < arr.length; i++){
            if (arr[i].pid === pid){
                tArr.push(arr[i]);
            }
        }

        for (var i = 0; i < tArr.length; i++){
            loadByPid(arr, tArr[i].id);
        }

        // 做 title 字符串拼接
        for (var i = 0, len = tArr.length; i < len; i++){
            var prefix = new Array(tArr[i].absdepth + 1).join('　');
            var symbol = (i == len - 1) ? '┗ ' : '┣ ';
            var ele = arr.find(function(obj){
                return obj.id == tArr[i].id;
            });
            ele.title = prefix + symbol + ele.title;
        }
    }

    //function loadByDepth(arr, depth){
    //    var prefix = new Array(depth + 1).join('　');
    //
    //    var tArr = [];
    //    for (var i = 0; i < arr.length; i++){
    //        if (arr[i].absdepth === depth){
    //            tArr.push(arr[i]);
    //        }
    //    }
    //
    //    if (tArr.length != 0){
    //        loadByDepth(arr, ++depth);
    //    }
    //
    //    for (var i = 0, len = tArr.length; i < len; i++){
    //        var t = (i == len - 1) ? '┗ ' : '┣ ';
    //        var ele = arr.find(function(obj){
    //            return obj.id == tArr[i].id;
    //        });
    //        ele.title = prefix + t + ele.title;
    //    }
    //}
});

/*
 * GET /addclassify/insert
 */
router.post('/insert', function(req, res){
    //console.log(req.query);

    // 属于跟分类
    if (req.query.pid == 0){
        addClassify(req, res, '0');
        return;
    }

    db.execute('select t1.depth from zh_classify t1 where t1.id = ?', [req.query.pid], function(rows){
        //console.log(rows);
        if (rows.length == 1){
            // 添加分类
            addClassify(req, res, rows[0].depth + '-' + req.query.pid);
        } else {
            res.json({
                errCode: 0,
                errMsg: '父级分类获取失败'
            });
        }
    });
});

// 添加分类
var addClassify = function(req, res, depth){
    // 文件夹名
    var uploadfoldername = 'images/classify';
    // 获取当前日期
    var time = dateFormat(new Date(), 'yyyymmddhhMMss');
    var file_path = req.query.path != '' ? path.join(uploadfoldername, req.query.path) : '';
    var file_thumb_path = file_path != '' ? path.join(uploadfoldername, 'thumb_' + req.query.path) : '';
    db.execute('insert into zh_classify (pid, depth, title, description, arc_pic_size, path, thumb_path, add_time, last_time, disable) ' +
        ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            req.query.pid,
            depth,
            req.query.title,
            req.query.description,
            req.query.arcpicsize,
            normalize(file_path),
            normalize(file_thumb_path),
            time,
            time,
            1
        ],
        function(rows){
            //console.log(rows);
            if (rows.affectedRows == 1){
                if (file_path != ''){ // 说明有图片上传
                    // 移动图片文件
                    fs.move(path.join(app.get('tempuploadpath'), req.query.path), path.join(app.get('classifypath'), req.query.path),
                        function (err){
                            if (err){
                                console.error(err);
                            }
                        });
                    fs.move(path.join(app.get('tempuploadpath'), 'thumb_' + req.query.path), path.join(app.get('classifypath'), 'thumb_' + req.query.path),
                        function (err){
                            if (err){
                                console.error(err);
                            }
                        });
                }
                res.json({
                    errCode: 1,
                    errMsg: '分类添加成功'
                });
            } else {
                res.json({
                    errCode: 0,
                    errMsg: '分类添加失败'
                });
            }
        });
};
