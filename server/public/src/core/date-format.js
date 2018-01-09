/**
 * @Author: jzy
 * @Date: 2016/12/16
 * @Last Modified by: jzy
 * @Last Modified time: 2016/12/16
 */
'use strict';

angular.module('myApp.filter.dateFormate', []).
    filter('dateFormate', function(){ // 自定义过滤器
        return function(dateStr){
            dateStr = dateStr.toString();
            var year = dateStr.substr(0, 4),
				month = dateStr.substr(4, 2),
				day = dateStr.substr(6, 2),
				hours = dateStr.substr(8, 2),
				minutes = dateStr.substr(10, 2),
				seconds = dateStr.substr(12, 2);
            return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
        };
    });