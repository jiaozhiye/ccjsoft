/**
 * @Author: Jzy
 * @Date: 2016/12/17
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/12/17
 */
var express = require('express');
var db = require('../models/db');
var dateFormat = require('dateformat');

// 路由对象
var router = express.Router();
router.prefix = '/addgroup';

// 暴露路由模块
module.exports = router;

/*
 * GET /addgroup/getnav
 */
router.get('/getnav', function(req, res){
    db.execute('select t1.name, t1.mark, t1.disable from zh_site_nav t1 ' +
        ' where t1.mark!=? and t1.disable=?',
        ['', 1],
        function(rows){
            //console.log(rows);
            if (rows.length && rows.length > 0){
                res.send({
                    errCode: 1,
                    errMsg: '系统分类信息获取成功',
                    info: rows
                });
            } else {
                res.send({
                    errCode: 0,
                    errMsg: '系统分类信息获取失败',
                    info: []
                });
            }
        });
});

/*
 * GET /addgroup/insert
 */
router.post('/insert', function(req, res){
    var params = req.query;
    //console.log(params);

    // 获取当前日期
    var time = dateFormat(new Date(), 'yyyymmddhhMMss');

    db.execute('insert into zh_user_group (name, description, add_time, last_time, disable) ' +
        ' values ' +
        ' (?, ?, ?, ?, ?)',
        [params.name, params.description, time, time, 1],
        function(rows){
            //console.log(rows); // insertId
            if (rows.affectedRows == 1){ // 用户组表添加成功
                var sqlArr = [];
                var sqlStr = '';
                //console.log(params.conf);
                var json = JSON.parse(params.conf);
                //console.log(json);
                for (var attr in json){
                    sqlArr.push([rows.insertId, attr, json[attr], time, time, 1]);
                    sqlStr += '(?),';
                }
                sqlStr = sqlStr.substring(0, sqlStr.length - 1);
                //console.log(sqlArr);
                db.execute("insert into zh_site_access (user_group_id, site_nav_mark, access, add_time, last_time, disable) " +
                    " values " + sqlStr, sqlArr,
                    function(rows){
                        if (rows.insertId){ // 权限表添加成功
                            res.json({
                                errCode: 1,
                                errMsg: '用户组和权限添加成功'
                            });
                        } else {
                            res.json({
                                errCode: 0,
                                errMsg: '用户组和权限添加失败'
                            });
                        }
                    });
            } else {
                res.json({
                    errCode: 0,
                    errMsg: '用户组添加失败'
                });
            }
        });
});