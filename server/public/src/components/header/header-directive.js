/**
 * @Author: Jzy
 * @Date: 2016/12/12
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/12/12
 */
'use strict';

angular.module('myApp.header.header-directive', ['myApp.factory.cookie']).
    directive('appHeader', [function(){
        return {
            restrict: 'EA',
            replace: true,
            scope: true,
            templateUrl: './src/components/header/header-template.html', // 模版
            controller: ['$scope', '$http', '$window', 'cookie', function($scope, $http, $window, cookie){
                $scope.proname  = 'App管理系统';
                $scope.username = cookie.getCookie('username');
                // 绑定退出方法
                $scope.logout = function(){
                    $http({
                        method: 'GET',
                        url: '/login/out'
                    })
                    .success(function(data){
                        console.log(data);
                        // 校验
                        if (data.errCode == 1){ // 退出成功
                            // 返回登录页面
                            $window.location.href = '/login.html';
                        }
                    })
                    .error(function(err){
                        throw err;
                    });
                };
            }]
        };
    }]);