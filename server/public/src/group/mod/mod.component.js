/**
 * @Author: Jzy
 * @Date: 2016/12/15
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/12/15
 */
'use strict';

// 注册 `modGroup` 组件, 与其相关的控制器和模版
angular.module('myApp.group.mod').
    component('modGroup', {
        templateUrl: './src/group/mod/mod.template.html',
        controller: ['$scope', '$http', '$routeParams', '$location', 'formVerify', function ModGroupCtrl($scope, $http, $routeParams, $location, formVerify){
            if (!($routeParams.id && $routeParams.id > 0)){
                return;
            }

            // 获取用户组信息
            $http({
                method: 'GET',
                url: '/modgroup/getone',
                params: {id: $routeParams.id}
            }).
            success(function(data){
                console.log(data);
                if (data.errCode == 1){
                    // 用户组信息
                    $scope.groupInfo = data.info[0];
                    // 系统分类列表
                    $scope.navList   = [];
                    for (var i = 0; i < data.info.length; i++){
                        // 过滤掉无效数据
                        if (data.info[i]['nav_disable'] != 1){
                            break;
                        }
                        var obj = {
                            mark : data.info[i]['mark'], // 分类标识符
                            name : data.info[i]['nav_name'], // 分类名
                            access : data.info[i]['access'] ? true : false // 权限
                        };
                        $scope.navList.push(obj);
                    }
                    console.log($scope.navList);
                    // 把 disable 转成布尔类型
                    $scope.groupInfo.disable = !$scope.groupInfo.disable;
                } else {

                }
            }).
            error(function(err){
                throw err;
            });

            // 修改用户组数据
            $scope.modInfo = function(){
                console.log($scope.navList);
                var tArr = [];
                for (var i = 0; i < $scope.navList.length; i++){
                    tArr[i] = {
                        mark : $scope.navList[i].mark,
                        access : $scope.navList[i].access ? 1 : 0 // 把 access 转成 0 或 1
                    };
                }
                var _data = {
                    id: $routeParams.id,
                    name: $scope.groupInfo.name,
                    description: $scope.groupInfo.description,
                    disable: !$scope.groupInfo.disable ? 1 : 0,
                    conf: tArr
                };
                console.log(_data);

                $http({
                    method: 'POST',
                    url: '/modgroup/update',
                    params: _data
                }).
                success(function(data){
                    console.log(data);
                    if (data.errCode == 1){
                        $location.path('/editgroup');
                    } else {
                        var oAlert = JZY.component.ModalDialog({
                            title: '提示信息',
                            msg: data.errMsg,
                            masker: '<div class="modal-backdrop fade"></div>',
                            btnArr: [
                                {
                                    name: '取消', className: 'btn-default', callback: function(){}
                                },
                                {
                                    name: '确认', className: 'btn-primary', callback: function(){}
                                }
                            ]
                        });
                        oAlert.init();
                    }
                }).
                error(function(err){
                    throw err;
                });
            };

            // 绑定校验服务到 $scope 上
            for (var attr in formVerify){
                $scope[attr] = formVerify[attr];
                $scope[attr].regVal = 'pass';
            }
        }]
    });