/**
 * @Author: jzy
 * @Date: 2016/12/31
 * @Last Modified by: jzy
 * @Last Modified time: 2016/12/31
 */
'use strict';

angular.module('myApp.select.select-directive', []).
    directive('appSelect', [function(){
        return {
            restrict: 'EA', // 元素 属性
            replace: true,  // 替换指令标签
            scope: { // 隔离作用域
                appData: '='
            },
            templateUrl: './src/components/select/select-template.html', // 模版
            controller: ['$scope', function($scope){
                //console.log($scope.appData);
                // 全选
                $scope.allFn = function(){
                    for (var i = 0; i < $scope.appData.length; i++){
                        $scope.appData[i].isCk = true;
                    }
                };
                // 全不选
                $scope.noneFn = function(){
                    for (var i = 0; i < $scope.appData.length; i++){
                        $scope.appData[i].isCk = false;
                    }
                };
                // 反选
                $scope.reverseFn = function(){
                    for (var i = 0; i < $scope.appData.length; i++){
                        $scope.appData[i].isCk = !$scope.appData[i].isCk;
                    }
                };
            }]
        };
    }]);