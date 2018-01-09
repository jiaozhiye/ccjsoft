/**
 * @Author: jzy
 * @Date: 2016/12/12
 * @Last Modified by: jzy
 * @Last Modified time: 2016/12/12
 */
var express = require('express');
var database = require('../models/database');
var db = require('../models/db');

// 路由对象
var router = express.Router();
router.prefix = '/sysinfo';

// 暴露路由模块
module.exports = router;

/*
 * GET /sysinfo
 */
router.get('/', function(req, res){
    //console.log(process);
    //console.log(req.headers.host);
    var arr = [
        {
            key: '访问域名',
            value: 'http://' + req.headers.host
        },
        {
            key: '服务器平台',
            value: process.env.OS + '(' + process.platform + ')'
        },
        {
            key: 'node版本',
            value: process.version
        },
        {
            key: 'V8引擎版本',
            value: process.versions['v8']
        },
        {
            key: '数据库类型',
            value: 'MySQL'
        }
    ];

    getDbVersion(function(err, val){
        if (err){
            console.error(err);
            //throw err;
        }
        arr.push({
            key: '数据库版本',
            value: val
        });
        getDbSize(function(err, val){
            if (err){
                console.error(err);
                //throw err;
            }
            arr.push({
                key: '数据库使用',
                value: (val / 1024).toFixed(2) + 'KB'
            });

            // 返回系统信息
            res.json({
                errCode: 1,
                errMsg: '系统信息获取成功',
                info: arr
            });
        });
    });
});

// 获取 mysql 版本号
var getDbVersion = function(callback){
    db.execute('select version() as version', function(rows){
        if (rows.length > 0){
            callback && callback(null, rows[0]['version']);
        } else {
            var err = new Error('mysql版本获取失败');
            callback && callback(err, '');
        }
    });
};

// 获取 mysql 使用大小
var getDbSize = function(callback){
    db.execute('SELECT SUM(DATA_LENGTH) + SUM(INDEX_LENGTH) as size ' +
        ' FROM information_schema.tables ' +
        ' WHERE TABLE_SCHEMA = ?',
        [database.connection.database],
        function(rows){
            if (rows.length > 0){
                callback && callback(null, rows[0]['size']);
            } else {
                var err = new Error('mysql使用大小获取失败');
                callback && callback(err, 0);
            }
        });
};