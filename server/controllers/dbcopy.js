/**
 * @Author: jzy
 * @Date: 2016/12/31
 * @Last Modified by: jzy
 * @Last Modified time: 2016/12/31
 */
var app = require('../app.js');
var express = require('express');
var path = require('path');
var database = require('../models/database');
var db = require('../models/db');
var mysqlDump = require('mysqldump');
var dateFormat = require('dateformat');

// 路由对象
var router = express.Router();
router.prefix = '/dbcopy';

// 暴露路由模块
module.exports = router;

/*
 * GET /dbcopy/get
 */
router.get('/get', function(req, res){
    var tables = [];
    db.execute('show table status', function(rows){
        if (rows.length > 0){
            //console.log(rows);
            for (var i = 0; i < rows.length; i++){
                var _data = {
                    tName: rows[i]['Name'],
                    tEngine: rows[i]['Engine'],
                    tRows: rows[i]['Rows'],
                    tDataLength: (rows[i]['Data_length'] / 1024).toFixed(2) + 'KB',
                    tCreateTime: rows[i]['Create_time']
                };
                tables[i] = _data;
            }

            res.json({
                errCode: 1,
                errMsg: '表数据获取成功',
                info: tables
            });
        } else {
            res.json({
                errCode: 0,
                errMsg: '表数据获取失败',
                info: tables
            });
        }
    });
});

/*
 * GET /dbcopy/copy
 */
router.get('/copy', function(req, res){
    //console.log(req.query);

    var dataArr = [];
    for (var i in req.query){
        dataArr.push(req.query[i]);
    }

    // 获取当前日期
    var time = dateFormat(new Date(), 'yyyymmddhhMMss');

    var dumpOption = database.connection;
    dumpOption.tables = dataArr; // only these tables
    dumpOption.dropTable = true; // Drop tables if exist
    dumpOption.dest = path.join(app.get('databasepath'), time +'.sql'); // destination file

    mysqlDump(dumpOption, function(err){
        if (err){
            res.json({
                errCode: 0,
                errMsg: '数据表备份失败'
            });
        } else {
            res.json({
                errCode: 1,
                errMsg: '数据表备份成功'
            });
        }
    });
});

/*
 * GET /dbcopy/optimize
 */
router.get('/optimize', function(req, res){
    //console.log(req.query);
    var tArr = [];
    for (var i in req.query){
        tArr.push(req.query[i]);
    }
    var str = tArr.join(',');

    db.execute('OPTIMIZE TABLE ' + str, function(rows){
        //console.log(rows);
        if (rows.length > 0){
            res.json({
                errCode: 1,
                errMsg: '表优化成功'
            });
        } else {
            res.json({
                errCode: 0,
                errMsg: '表优化失败'
            });
        }
    });
});

/*
 * GET /dbcopy/repair
 */
router.get('/repair', function(req, res){
    //console.log(req.query);
    var tArr = [];
    for (var i in req.query){
        tArr.push(req.query[i]);
    }
    var str = tArr.join(',');

    db.execute('REPAIR TABLE ' + str, function(rows){
        //console.log(rows);
        if (rows.length > 0){
            res.json({
                errCode: 1,
                errMsg: '表修复成功'
            });
        } else {
            res.json({
                errCode: 0,
                errMsg: '表修复失败'
            });
        }
    });
});