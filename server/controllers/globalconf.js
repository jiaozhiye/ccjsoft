/**
 * @Author: jzy
 * @Date: 2016/12/14
 * @Last Modified by: jzy
 * @Last Modified time: 2016/12/14
 */
var express = require('express');
var db = require('../models/db');
var dateFormat = require('dateformat');

// 路由对象
var router = express.Router();
router.prefix = '/globalconf';

// 暴露路由模块
module.exports = router;

/*
 * GET /globalconf/get
 */
router.get('/get', function (req, res){
    db.execute("select t1.* from zh_site_config t1", function (rows){
        if (rows.length && rows.length > 0){
            res.json({
                errCode: 1,
                errMsg: '网站配置信息获取成功',
                info: rows[0]
            });
        } else {
            res.json({
                errCode: 0,
                errMsg: '网站配置信息获取失败',
                info: {}
            });
        }
    });
});

/*
 * GET /globalconf/set
 */
router.post('/set', function (req, res){
    //console.log(req.query);

    // 获取当前日期
    var time = dateFormat(new Date(), 'yyyymmddhhMMss');

    db.execute('update zh_site_config t1 ' +
        ' set t1.title=?, t1.keywords=?, t1.description=?, t1.copy=?, t1.address=?, t1.phone=?, t1.email=?, t1.records=?, t1.last_time=? ' +
        ' where id=?',
        [
            req.query.title,
            req.query.keywords,
            req.query.description,
            req.query.copy,
            req.query.address,
            req.query.phone,
            req.query.email,
            req.query.records,
            time,
            req.query.id
        ],
        function (rows){
            if (rows.affectedRows > 0){ // 受影响的行数
                res.json({
                    errCode: 1,
                    errMsg: '网站配置信息更新成功'
                });
            } else {
                res.json({
                    errCode: 0,
                    errMsg: '网站配置信息更新失败'
                });
            }
        });
});