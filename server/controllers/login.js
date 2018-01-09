/**
 * @Author: jzy
 * @Date: 2016/12/10
 * @Last Modified by: jzy
 * @Last Modified time: 2016/12/10
 */
var express = require('express');
var md5 = require('md5');
var db = require('../models/db');
var dateFormat = require('dateformat');

// 路由对象
var router = express.Router();
router.prefix = '/login';

// 暴露路由模块
module.exports = router;

/*
 * GET /login/do
 */
router.post('/do', function(req, res){
    // 获取参数
    var name = req.query.username;
    var pwd  = md5(req.query.password);

    //"select t1.disable isValid, t1.username name, t1.password pwd" +
    //" from zh_user t1" +
    //" where t1.username=" + db.mysql_escape(params.username) +
    //" and t1.password='"  + md5(params.password) + "'"

    // 登录校验
    db.execute('select t1.id, t1.username name, t1.password pwd, t1.disable isValid' +
        ' from zh_user t1 left join zh_user_group t2 on t1.user_group_id=t2.id' +
        ' where t1.username=? and t1.password=? and t1.disable=1 and t2.disable=1',
        [name, pwd],
        function(rows){
            //console.log(rows);
            if (rows.length && rows.length > 0 && rows[0].isValid == 1){ // 登录成功
                var isLogin = req.session.isLogin;

                // 用户 ID
                var userid   = rows[0].id;
                var username = rows[0].name;

                if (!isLogin){
                    // 登录状态写入 session
                    req.session.isLogin  = 1;
                    req.session.userid   = userid;
                    req.session.username = username;
                }
                //console.log(req.session);

                // 用户名写入 cookie
                res.cookie('username', req.session.username);
                //console.log('Cookies: ', req.cookies);

                // 获取当前日期
                var time = dateFormat(new Date(), 'yyyymmddhhMMss');

                db.execute('update zh_user t1 set t1.last_sign_time=? where t1.id=?', [time, userid],
                function(rows){
                    //console.log(rows.affectedRows);
                });

                //SELECT
                //t1.username, t2.`site_nav_mark`, t3.`name`, t3.`link`, t2.`access`
                //FROM
                //`zh_user` t1 LEFT JOIN `zh_site_access` t2 ON t1.`user_group_id` = t2.`user_group_id`
                //LEFT JOIN `zh_site_nav` t3 ON t2.`site_nav_mark` = t3.`mark`
                //WHERE
                //t1.`id` = userid

                db.execute('SELECT ' +
                    ' t1.username, t2.`site_nav_mark`, t3.`name`, t3.`link`, t2.`access` ' +
                    ' FROM ' +
                    ' `zh_user` t1 LEFT JOIN `zh_site_access` t2 ON t1.`user_group_id` = t2.`user_group_id` ' +
                    ' LEFT JOIN `zh_site_nav` t3 ON t2.`site_nav_mark` = t3.`mark` ' +
                    ' WHERE ' +
                    ' t1.`id` = ?', [userid],
                    function(rows){
                        //console.log(rows);
                        // 设置 session 权限
                        for (var i = 0; i < rows.length; i++){
                            req.session[rows[i]['site_nav_mark']] = rows[i]['access'];
                        }
                        //console.log(req.session);
                        res.json({
                            errCode: 1,
                            errMsg: '用户合法'
                        });
                    });
            } else { // 登录失败
                res.json({
                    errCode: 0,
                    errMsg: '用户非法'
                });
            }
        });

});

/*
 * GET /login/out
 */
router.get('/out', function(req, res){
    // 销毁 session
    req.session.destroy(function(err){
        if (err){
            res.json({errCode: 0, errMsg: '退出登录失败'});
            return;
        }
        // 销毁 cookie
        res.clearCookie('username');
        res.json({errCode: 1, errMsg: '退出登录成功'});
    });
});
