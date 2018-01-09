/**
 * @Author: jzy
 * @Date: 2016/12/31
 * @Last Modified by: jzy
 * @Last Modified time: 2016/12/31
 */
var app = require('../app.js');
var express = require('express');
var fs = require('fs-extra');
var path = require('path');
var util = require('util');
var database = require('../models/database');
var db = require('../models/db');
var exec = require('child_process');

// 路由对象
var router = express.Router();
router.prefix = '/dbrestore';

// 暴露路由模块
module.exports = router;

/*
 * GET /dbrestore/get
 */
router.get('/get', function(req, res){
    var dir = app.get('databasepath');
    fs.readdir(dir, function(err, data){
        if (err){
            console.error(err);
            res.json({
                errCode: 0,
                errMsg: '数据备份文件获取失败',
                info: []
            });
        } else {
            var tArr = [];
            for (var i = 0; i < data.length; i++) {
                //console.log(path.join(dir, data[i]));
                try {
                    var stats = fs.statSync(path.join(dir, data[i]));
                    //console.log(stats);
                    tArr.push({
                        fName: path.basename(data[i], '.sql'),
                        fSize: (stats.size / 1024).toFixed(2) + 'KB',
                        fTime: stats.atime
                    });
                } catch (err){
                    console.error(err);
                    //throw err;
                }
            }
            res.json({
                errCode: 1,
                errMsg: '数据备份文件获取成功',
                info: tArr
            });
        }
    });
});

/*
 * GET /dbrestore/restore
 */
router.get('/restore', function(req, res){
    var sqlFilePath = path.join(app.get('databasepath'), req.query.fName + '.sql');
    if (fs.existsSync(sqlFilePath)){
        var command = util.format('mysql -h %s -u %s -p%s %s < %s', database.connection.host, database.connection.user, database.connection.password, database.connection.database, sqlFilePath);
        //var command = util.format('source %s', sqlFilePath);
        //console.log(command);
        //db.execute(command, function(rows){
        //    console.log(rows);
        //});

        exec.exec(command, function (err){
            if (err){
                console.error(err);
                res.json({
                    errCode: 0,
                    errMsg: '恢复数据失败'
                });
            } else {
                res.json({
                    errCode: 1,
                    errMsg: '恢复数据成功'
                });
            }
        });
    } else {
        console.error(new Error('Dump sql path doesn\'t exists'));
        res.json({
            errCode: 0,
            errMsg: '备份文件不存在'
        });
    }
});

/*
 * GET /dbrestore/del
 */
router.get('/del', function(req, res){
    //console.log(req.query);
    var dir = app.get('databasepath');
    var tArr = [];
    for (var i in req.query){
        tArr.push(req.query[i]);
    }

    var isSuccess = true;
    for (var i = 0; i < tArr.length; i++){
        try {
            fs.unlinkSync(path.join(dir, tArr[i] + '.sql'));
        } catch (err){
            isSuccess = false;
            console.error(err);
            //throw err;
        }
    }
    if (isSuccess){
        res.json({
            errCode: 1,
            errMsg: '表备份删除成功'
        });
    } else {
        res.json({
            errCode: 0,
            errMsg: '表备份删除失败'
        });
    }
});
