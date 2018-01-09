/**
 * @Author: Jzy
 * @Date: 2016/10/17
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/10/17
 */
var mysql    = require('mysql');
var database = require('./database.js');

// 数据库操作
exports.execute = function(query, arr, callback){
    var connection = mysql.createConnection(database.connection);
    connection.connect(function (err){
        if (err){
            console.error('error connecting: ' + err.stack);
            return;
        }
    });

    if (arguments.length === 2){ // 普通sql语句方式
        callback = arr;
        connection.query(query, function (err, rows, fields){
            if (err) throw err;
            callback && callback(rows, fields);
        });
    } else { // 查询参数占位方式
        connection.query(query, arr, function (err, rows, fields){
            if (err) throw err;
            callback && callback(rows, fields);
        });
    }

    connection.end();
};

// 防止sql注入
exports.mysql_escape = function(params){
    return mysql.escape(params);
};

