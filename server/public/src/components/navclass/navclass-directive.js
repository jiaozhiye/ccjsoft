/**
 * @Author: jzy
 * @Date: 2017/7/2
 * @Last Modified by: jzy
 * @Last Modified time: 2017/7/2
 */
'use strict';

angular.module('myApp.navclass.navclass-directive', []).
    directive('appNav', [function(){
        return {
            restrict: 'EA', // 元素 属性
            replace: true,  // 替换指令标签
            scope: {
                navid: '=', // 导航ID
            },
            templateUrl: './src/components/navclass/navclass-template.html', // 模版
            controller: ['$scope', '$http', function AppNavCtrl($scope, $http){

                $http({
                    method: 'GET',
                    url: '/addnav/get'
                }).then(function(resp){
                    var data = resp.data;
                    console.log(data);

                    $scope.navList = data.info;
                    $scope.navid   = $scope.navid ? $scope.navid : $scope.navList[0].id;

                }, function(resp){
                    throw resp.statusText;
                });

            }]
        };
    }]);