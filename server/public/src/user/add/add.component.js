/**
 * @Author: Jzy
 * @Date: 2016/12/15
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/12/15
 */
'use strict';

// 注册 `addUser` 组件, 与其相关的控制器和模版
angular.module('myApp.user.add').
    component('addUser', {
        templateUrl: './src/user/add/add.template.html',
        controller: ['$scope', '$http', '$location', 'formVerify', function AddUserCtrl($scope, $http, $location, formVerify){
            // 用户组数据
            $scope.groupList = [{id: 0, name: '== 请选择用户组 =='}];
            // 默认显示用户组
            $scope.groupid   = $scope.groupList[0].id;

            // 添加用户
            $scope.addInfo = function(){
                var _data = {
                    user_group_id: $scope.groupid,
                    username: $scope.uname,
                    password1: $scope.pwd1,
                    password2: $scope.pwd2,
                    email: $scope.email
                };
                console.log(_data);

                if (_data.user_group_id == 0){
                    return;
                }

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

                // 发起请求
                $http({
                    method: 'POST',
                    url: '/adduser/insert',
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