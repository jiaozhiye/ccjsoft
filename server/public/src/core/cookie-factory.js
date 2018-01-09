/**
 * @Author: Jzy
 * @Date: 2016/12/12
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/12/12
 */
'use strict';

angular.module('myApp.factory.cookie', []).
    factory('cookie', function (){
        // 添加 cookie
        var addCookie = function(name, value, expDays, domain, path, secure){
            var date = new Date();
            date.setTime(date.getTime() + parseInt(expDays) * 1000 * 60 * 60 * 24);
            var cookie = name + '=' + encodeURIComponent(value) + ';expires=' + date.toUTCString();
            cookie += domain ? ';domain=' + domain : '';
            cookie += path ? ';path=' + path : '';
            cookie += secure ? ';secure' : '';
            document.cookie = cookie;
        };
        // 获取 cookie
        var getCookie = function(name){
            var m = document.cookie.match('(?:^|;)\\s*' + name + '=([^;]*)');
            return (m && m[1]) ? decodeURIComponent(m[1]) : '';
        };
        // 删除 cookie
        var removeCookie = function(name, domain, path, secure){
            var date = new Date();
            date.setTime(date.getTime() - 1000);
            var cookie = name + '=a;expires=' + date.toUTCString();
            cookie += domain ? ';domain=' + domain : '';
            cookie += path ? ';path=' + path : '';
            cookie += secure ? ';secure' : '';
            document.cookie = cookie;
        };
        return {
            addCookie: addCookie,
            getCookie: getCookie,
            removeCookie: removeCookie
        };
    });