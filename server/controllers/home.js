/**
 * @Author: jzy
 * @Date: 2016/12/10
 * @Last Modified by: jzy
 * @Last Modified time: 2016/12/10
 */
var express = require('express');
var db = require('../models/db');

// 路由对象
var router = express.Router();
router.prefix = '/home';

// 暴露路由模块
module.exports = router;

//[
//    {
//        name: '系统配置',
//        list: [
//            {name: '系统信息', list: []},
//            {name: '全局配置', list: []}
//        ]
//    }
//]

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
 * GET /home/sidebar
 */
router.get('/sidebar', function(req, res){
    db.execute('select t1.id, t1.pid, t1.name, t1.link ' +
        ' from zh_site_nav t1 ' +
        ' where t1.disable=? ' +
        ' order by t1.order_list asc, t1.id asc',
        [1],
        function(rows){
            var data = loadByPid(rows, 0);
            //console.log(data);

            if (rows.length && rows.length > 0){
                res.json({
                    errCode: 1,
                    errMsg: '系统侧栏分类获取成功',
                    info: data
                });
            } else {
                res.json({
                    errCode: 0,
                    errMsg: '系统侧栏分类获取失败',
                    info: []
                });
            }
        });
});