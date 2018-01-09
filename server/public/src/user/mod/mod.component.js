/**
 * @Author: Jzy
 * @Date: 2016/12/16
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/12/16
 */
'use strict';

// 注册 `modUser` 组件, 与其相关的控制器和模版
angular.module('myApp.user.mod').
    component('modUser', {
        templateUrl: './src/user/mod/mod.template.html',
        controller: ['$scope', '$http', '$routeParams', '$location', 'formVerify', function ModUserCtrl($scope, $http, $routeParams, $location, formVerify){
            if (!($routeParams.id && $routeParams.id > 0)){
                return;
            }

            // 获取用户信息
            $scope.userInfo = {};

            // 请求用户列表
            $http({
                method: 'GET',
                url: '/moduser/getone',
                params: {id: $routeParams.id}
            }).
            success(function(data){
                console.log(data);
                if (data.errCode == 1){
                    $scope.userInfo = data.info;
                    // 把 disable 转成布尔类型
                    $scope.userInfo.disable = !$scope.userInfo.disable;
                    // 指定用户组
                    $scope.groupid  = data.info.gid;
                } else {

                }
            }).
            error(function(err){
                throw err;
            });

            // 修改操作
            $scope.modInfo = function(){
                var _data = {
                    id: $routeParams.id,
                    user_group_id: $scope.groupid,
                    username: $scope.userInfo.username,
                    password1: $scope.pwd1,
                    password2: $scope.pwd2,
                    email: $scope.userInfo.email,
                    disable: $scope.userInfo.disable ? 0 : 1
                };
                console.log(_data);

                for (var attr in _data){
                    if (typeof _data[attr] == 'undefined'){ // 数据有误
                        var oAlert = JZY.component.ModalDialog({
                            title: '提示信息',
                            msg: '填写的数据有误，请注意检查~~~',
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
                        return;
                    }
                }

                $http({
                    method: 'POST',
                    url: '/moduser/update',
                    params: _data
                }).
                success(function(data){
                    if (data.errCode == 1){
                        // 添加成功，跳转到用户的编辑页面
                        $location.path('/edituser');
                    } else {
                        var oAlert2 = JZY.component.ModalDialog({
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
                        oAlert2.init();
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