/**
 * @Author: jzy
 * @Date: 2016/10/17
 * @Last Modified by: jzy
 * @Last Modified time: 2016/10/17
 */
var pool = require('./pool');

exports.query = function(sql, arr, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        // connection -> 在连接池中申请到的，可用的 连接资源
        connection.query(sql, arr, function (error, results, fields){
            // 释放资源 -> 把当前的连接资源返回给连接池
            connection.release();
            if (error) throw error;
            callback && callback(results, fields);
        });
    });
};

// 防止sql注入
exports.mysql_escape = function(params){
    return mysql.escape(params);
};
