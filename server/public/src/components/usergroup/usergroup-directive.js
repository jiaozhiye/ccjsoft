/**
 * @Author: Jzy
 * @Date: 2016/12/16
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/12/16
 */
'use strict';

angular.module('myApp.usergroup.usergroup-directive', []).
    directive('appUsergroup', [function(){
        return {
            restrict: 'EA', // 元素 属性
            replace: true,  // 替换指令标签
            templateUrl: './src/components/usergroup/usergroup-template.html', // 模版
            controller: ['$scope', '$http', function($scope, $http){
                if (typeof $scope.groupList == 'undefined'){
                    $scope.groupList = []; // 用户组数据
                }

                // 获取用户组信息
                $http({
                    method: 'GET',
                    url: '/adduser/getgroup'
                }).
                success(function(data){
                    if (data.errCode == 1){
                        //console.log(data.info);
                        $scope.groupList = $scope.groupList.concat(data.info);
                        if (typeof $scope.groupid == 'undefined'){
                            $scope.groupid = $scope.groupList[0].id; // 用户组默认ID
                        }
                    } else {

                    }
                }).
                error(function(err){
                    throw err;
                });
            }]
        };
    }]);