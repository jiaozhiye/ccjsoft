/**
 * @Author: jzy
 * @Date: 2017/6/24
 * @Last Modified by: jzy
 * @Last Modified time: 2017/6/24
 */
var app = require('../app.js');
var express = require('express');
var db = require('../models/db2');

// 路由对象
var router = express.Router();
router.prefix = '/api';

// 暴露路由模块
module.exports = router;

// 允许前台访问域
var originUrl = app.get('originUrl');
var nopicPath = 'src/common/img/nopic.png';

/*
 * GET /api/newsList
 * 新闻咨询接口
 */
router.get('/newsList', function(req, res){
    res.set('Access-Control-Allow-Origin', originUrl);
    var hostUrl = req.protocol + '://' + req.headers.host + '/';

    db.query('select ' +
        ' t1.id, t1.title, t1.description, CONCAT(?, IF(t1.path<>"", t1.path, ?)) img_src, t2.username author ' +
        ' from zh_article t1 ' +
        ' left join zh_user t2 on t1.author=t2.id ' +
        ' where t1.cid=? order by t1.id desc limit 4', [hostUrl, nopicPath, 1],
		function(rows){
			if (rows.length > 0){
				res.json({
					errCode: 1,
					errMsg: '新闻咨询数据获取成功',
					info: rows
				});
			} else {
				res.json({
					errCode: 0,
					errMsg: '新闻咨询数据获取失败',
					info: []
				});
			}
		});
});

/*
 * GET /api/videoList
 * 教学视频接口
 */
router.get('/videoList', function(req, res){
    res.set('Access-Control-Allow-Origin', originUrl);
    var hostUrl = req.protocol + '://' + req.headers.host + '/';

    db.query('select ' +
        ' t1.id, t1.title, CONCAT(?, IF(t1.path<>"", t1.path, ?)) img_src, t2.content video_src' +
        ' from zh_article t1 ' +
        ' left join zh_content t2 on t1.content_id=t2.id ' +
        ' where t1.cid=? order by t1.id desc limit 20', [hostUrl, nopicPath, 2],
        function(rows){
            if (rows.length > 0){
                res.json({
                    errCode: 1,
                    errMsg: '视频据获取成功',
                    info: rows
                });
            } else {
                res.json({
                    errCode: 0,
                    errMsg: '视频数据获取失败',
                    info: []
                });
            }
        });
});

/*
 * GET /api/teacher
 * 师资力量接口
 */
router.get('/teacher', function(req, res){
    res.set('Access-Control-Allow-Origin', originUrl);
    var hostUrl = req.protocol + '://' + req.headers.host + '/';

    db.query('select ' +
        ' t1.id, t1.title name, t1.description course, CONCAT(?, IF(t1.path<>"", t1.path, ?)) img_src, t2.content ' +
        ' from zh_article t1 ' +
        ' left join zh_content t2 on t1.content_id=t2.id ' +
        ' where t1.cid=? order by t1.id asc limit 7', [hostUrl, nopicPath, 3],
        function(rows){
            if (rows.length > 0){
                for (var i = 0; i < rows.length; i++){
                    rows[i].state = 'hidden';
                }

                res.json({
                    errCode: 1,
                    errMsg: '教师据获取成功',
                    info: rows
                });
            } else {
                res.json({
                    errCode: 0,
                    errMsg: '教师数据获取失败',
                    info: []
                });
            }
        });
});

/*
 * GET /api/friend
 * 优秀校友接口
 */
router.get('/friend', function(req, res){
    res.set('Access-Control-Allow-Origin', originUrl);
    var hostUrl = req.protocol + '://' + req.headers.host + '/';

    db.query('select ' +
        ' t1.id, t1.title, t1.description, CONCAT(?, IF(t1.path<>"", t1.path, ?)) img_src, t1.add_time time ' +
        ' from zh_article t1 ' +
        ' where t1.cid=? order by t1.id desc limit 6', [hostUrl, nopicPath, 4],
        function(rows){
            if (rows.length > 0){
                res.json({
                    errCode: 1,
                    errMsg: '优秀校友据获取成功',
                    info: rows
                });
            } else {
                res.json({
                    errCode: 0,
                    errMsg: '优秀校友数据获取失败',
                    info: []
                });
            }
        });
});

/*
 * GET /api/activity
 * 活动展示接口
 */
router.get('/activity', function(req, res){
    res.set('Access-Control-Allow-Origin', originUrl);
    var hostUrl = req.protocol + '://' + req.headers.host + '/';

    db.query('select ' +
        ' t1.id, t1.title, CONCAT(?, IF(t1.path<>"", t1.path, ?)) img_src, t1.add_time time ' +
        ' from zh_article t1 ' +
        ' where t1.cid=? order by t1.id desc limit 6', [hostUrl, nopicPath, 5],
        function(rows){
            if (rows.length > 0){
                res.json({
                    errCode: 1,
                    errMsg: '活动展示据获取成功',
                    info: rows
                });
            } else {
                res.json({
                    errCode: 0,
                    errMsg: '活动展示数据获取失败',
                    info: []
                });
            }
        });
});

/*
 * GET /api/list
 * 列表页数据接口
 */
router.get('/list', function(req, res){
    res.set('Access-Control-Allow-Origin', originUrl);
    var hostUrl = req.protocol + '://' + req.headers.host + '/';

    var lists  = {
            sql: 'select ' +
            ' t1.id, t2.title claname, t1.title, t1.description, CONCAT(?, IF(t1.path<>"", t1.path, ?)) img_src, t3.username author, t1.add_time time ' +
            ' from zh_article t1 ' +
            ' left join zh_classify t2 on t1.cid=t2.id ' +
            ' left join zh_user t3 on t1.author=t3.id ' +
            ' where t1.cid=? order by t1.id desc limit ?',
            params: [hostUrl, nopicPath, req.query.cid, 6]
        },
        totails = {
            sql: 'select count(*) total from zh_article where cid=?',
            params: [req.query.cid]
        };

    db.query([].concat(lists.sql, totails.sql).join(';'), [].concat(lists.params, totails.params),
        function(rows){
            if (rows.length > 0 && rows[0].length > 0){
                res.json({
                    errCode: 1,
                    errMsg: '活动展示据获取成功',
                    info: {
                        list: rows[0],
                        showNum: 6,
                        totalPage: Math.ceil(rows[1][0].total / 6)
                    }
                });
            } else {
                res.json({
                    errCode: 0,
                    errMsg: '活动展示数据获取失败',
                    info: {}
                });
            }
        });
});

/*
 * GET /api/pageindex
 * 分页接口
 */
router.get('/pageindex', function(req, res){
    res.set('Access-Control-Allow-Origin', originUrl);
    var hostUrl = req.protocol + '://' + req.headers.host + '/';

    db.query('select ' +
        ' t1.id, t1.title, t1.description, CONCAT(?, IF(t1.path<>"", t1.path, ?)) img_src, t2.username author, t1.add_time time ' +
        ' from zh_article t1 left join zh_user t2 on t1.author=t2.id ' +
        ' where t1.cid=? order by t1.id desc limit ?, ?',
        [hostUrl, nopicPath, req.query.cid, req.query.pageno * 6, 6],
		function(rows){
            if (rows.length > 0){
                res.json({
                    errCode: 1,
                    errMsg: '数据获取成功',
                    info: rows
                });
            } else {
                res.json({
                    errCode: 0,
                    errMsg: '数据获取失败',
                    info: []
                });
            }
        });
});

/*
 * GET /api/view
 * 详情页面接口
 */
router.get('/view', function(req, res){
    res.set('Access-Control-Allow-Origin', originUrl);

    db.query('select ' +
        ' t1.id, t1.title, t1.description, t2.content, t3.id classid, t3.title claname, t4.username author, t1.add_time time ' +
        ' from zh_article t1 ' +
        ' left join zh_content t2 on t1.content_id=t2.id ' +
        ' left join zh_classify t3 on t1.cid=t3.id ' +
        ' left join zh_user t4 on t1.author=t4.id ' +
        ' where t1.id=?',
        [req.query.id],
        function(rows){
            if (rows.length == 1){
                res.json({
                    errCode: 1,
                    errMsg: '数据获取成功',
                    info: rows[0]
                });
            } else {
                res.json({
                    errCode: 0,
                    errMsg: '数据获取失败',
                    info: null
                });
            }
        });
});

/*
 * GET /api/courseClass
 * 课程视频分类接口
 */
router.get('/courseClass', function(req, res){
    res.set('Access-Control-Allow-Origin', originUrl);

    db.query('select t1.id, t1.title, t1.add_time time ' +
        ' from zh_classify t1 ' +
        ' where t1.pid=? order by t1.id asc', [6],
        function(rows){
            if (rows.length > 0){
                res.json({
                    errCode: 1,
                    errMsg: '课程分类数据获取成功',
                    info: rows
                });
            } else {
                res.json({
                    errCode: 0,
                    errMsg: '课程分类数据获取失败',
                    info: []
                });
            }
        });
});


/*
 * GET /api/courseList
 * 课程视频数据接口
 */
router.get('/courseList', function(req, res){
    res.set('Access-Control-Allow-Origin', originUrl);
    var hostUrl = req.protocol + '://' + req.headers.host + '/';

    db.query('select ' +
        ' t1.id, t1.title, t1.description video_src, CONCAT(?, IF(t1.path<>"", t1.path, ?)) img_src, t1.add_time time ' +
        ' from zh_article t1 ' +
        ' where t1.cid=? order by t1.id asc',
        [hostUrl, nopicPath, req.query.cid],
        function(rows){
            if (rows.length > 0){
                res.json({
                    errCode: 1,
                    errMsg: '课程视频数据获取成功',
                    info: rows
                });
            } else {
                res.json({
                    errCode: 0,
                    errMsg: '课程视频数据获取失败',
                    info: []
                });
            }
        });
});
