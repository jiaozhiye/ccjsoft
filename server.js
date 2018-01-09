/**
 * @Author: jzy
 * @Date: 2016/12/10
 * @Last Modified by: jzy
 * @Last Modified time: 2016/12/10
 */
// 分发
var app = require('./server/app.js');

var hostname = '127.0.0.1';
var port     = process.env.PORT || 2080;

app.listen(port, hostname, function(err){
    if (err) throw err;
    app.set('url', 'http://'+ hostname +':'+ port);
    console.log('Server running at http://'+ hostname +':'+ port +'/');
});
