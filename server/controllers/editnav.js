/**
 * @Author: jzy
 * @Date: 2017/7/3
 * @Last Modified by: jzy
 * @Last Modified time: 2017/7/3
 */
var express = require('express');
var db = require('../models/db');
var dateFormat = require('dateformat');

// 路由对象
var router = express.Router();
router.prefix = '/editnav';

// 暴露路由模块
module.exports = router;

// 递归方法
var loadByPid = function(arr, pid){
    var tArr = [];
    for (var i = 0; i < arr.length; i++){
        if (arr[i].pid === pid){
            tArr.push(arr[i]);
        }
    }

    for (var i = 0; i < tArr.length; i++){
        tArr[i].list = loadByPid(arr, tArr[i].id);
    }

    for (var i = 0, len = tArr.length; i < len; i++){
        var symbol = (i == len - 1) ? '┗ ' : '┣ ';
        tArr[i].name = symbol + tArr[i].name;
    }

    return tArr;
};

// id pid  depth
// 1   0    0
// 2   1    0-1
// 3   1    0-1

// 4   0    0
// 5   4    0-4
// 6   4    0-4

/*
 * GET /editnav/get
 */
router.get('/get', function(req, res){
    db.execute('select t1.id, t1.pid, t1.name, t1.mark, t1.order_list, t1.disable ' +
        ' from zh_site_nav t1 where 1=? ' +
        ' order by t1.order_list asc, t1.id asc',
        [1],
        function(rows){
            if (rows.length && rows.length > 0){
                var data = loadByPid(rows, 0);
                //console.log(data);
                res.json({
                    errCode: 1,
                    errMsg: '导航分类获取成功',
                    info: data
                });
            } else {
                res.json({
                    errCode: 0,
                    errMsg: '导航分类获取失败',
                    info: []
                });
            }
        });
});

/*
 * GET /editnav/order
 */
router.get('/order', function(req, res){
    // 获取当前日期
    var time = dateFormat(new Date(), 'yyyymmddhhMMss');
    db.execute('update zh_site_nav t1 set t1.last_time=?, t1.order_list=? where t1.id=?',
        [time, req.query.order, req.query.id],
        function(rows){
            //console.log(rows);
            if (rows.affectedRows == 1){
                res.json({
                    errCode: 1,
                    errMsg: '导航排序修改成功'
                });
            } else {
                res.json({
                    errCode: 0,
                    errMsg: '导航排序修改失败'
                });
            }
        });
});

/*
 * GET /editnav/del
 */
router.get('/del', function(req, res){
    db.execute('select count(*) total from zh_site_nav t1 where t1.pid = ?', [req.query.id], function(rows, fields){
        //console.log(rows);
        if (rows[0].total > 0){
            res.json({
                errCode: 0,
                errMsg: '导航分类删除失败，请先删除其下的子分类'
            });
        } else {
            db.execute('delete from zh_site_nav where id=?', [req.query.id], function(rows){
                if (rows.affectedRows == 1){
                    res.json({
                        errCode: 1,
                        errMsg: '导航分类删除成功'
                    });
                } else {
                    res.json({
                        errCode: 0,
                        errMsg: '导航分类删除失败'
                    });
                }
            });
        }
    });
});