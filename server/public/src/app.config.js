/**
 * @Author: jzy
 * @Date: 2016/12/11
 * @Last Modified by: jzy
 * @Last Modified time: 2016/12/11
 */
// 对主模块做路由配置
angular.module('myApp').
    config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider){
        $locationProvider.hashPrefix('!');

        // 设置路由
        $routeProvider.
            when('/sysinfo', {
                template: '<sys-info></sys-info>'
            }).
            when('/globalconf', {
                template: '<global-conf></global-conf>'
            }).
            when('/dbcopy', {
                template: '<db-copy></db-copy>'
            }).
            when('/dbrestore', {
                template: '<db-restore></db-restore>'
            }).
            when('/addgroup', {
                template: '<add-group></add-group>'
            }).
            when('/editgroup', {
                template: '<edit-group></edit-group>'
            }).
            when('/modgroup/:id', {
                template: '<mod-group></mod-group>'
            }).
            when('/adduser', {
                template: '<add-user></add-user>'
            }).
            when('/edituser', {
                template: '<edit-user></edit-user>'
            }).
            when('/moduser/:id', {
                template: '<mod-user></mod-user>'
            }).
            when('/addclassify', {
                template: '<add-classify></add-classify>'
            }).
            when('/editclassify', {
                template: '<edit-classify></edit-classify>'
            }).
            when('/modclassify/:id', {
                template: '<mod-classify></mod-classify>'
            }).
            when('/addarticle', {
                template: '<add-article></add-article>'
            }).
            when('/editarticle', {
                template: '<edit-article></edit-article>'
            }).
            when('/modarticle/:id', {
                template: '<mod-article></mod-article>'
            }).
            when('/addnav', {
                template: '<add-appnav></add-appnav>'
            }).
            when('/editnav', {
                template: '<edit-appnav></edit-appnav>'
            }).
            when('/modnav/:id', {
                template: '<mod-appnav></mod-appnav>'
            }).
            otherwise({
                redirectTo: '/sysinfo'
            });
    }]);