/**
 * @Author: Jzy
 * @Date: 2016/12/16
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/12/16
 */
'use strict';

// 注册 `editUser` 组件, 与其相关的控制器和模版
angular.module('myApp.user.edit').
    component('editUser', {
        templateUrl: './src/user/edit/edit.template.html',
        controller: ['$scope', '$http', function EditUserCtrl($scope, $http){
            // 用户数据
            $scope.userList = [];
            // limitTo 显示几条
            $scope.pageNum  = 3;
            // limitTo 从第几条开始显示
            $scope.curIndex = 0;

            // 请求用户列表
            $scope.pageInit = function(callback){
                $http({
                    method: 'GET',
                    url: '/edituser/get'
                }).
                success(function(data){
                    console.log(data);
                    if (data.errCode == 1){
                        $scope.userList = data.info;
                        var total = Math.ceil($scope.userList.length / $scope.pageNum);
                        $scope.curIndex = $scope.curIndex <= total ? $scope.curIndex : total;
                        callback && callback(total, $scope.curIndex);
                    } else {

                    }
                }).
                error(function(err){
                    throw err;
                });
            };

            $scope.getList = function(cur){
                $scope.curIndex = (cur - 1) * $scope.pageNum;
                // 触发脏检查
                $scope.$apply();
            };

            // 用户组数据
            $scope.groupList = [{id: 0, name: '请选择用户组'}];
            // 默认显示用户组
            $scope.groupid   = $scope.groupList[0].id;

            // 执行搜索按钮的过滤操作
            $scope.filterFn = function(val){
                $scope.searchVal = val;
                //$scope.userList = $filter('filter')(originData, $scope.search);
            };
            $scope.filterFn2 = function(val){
                if (val == 0){
                    // '' -> 取消筛选条件
                    $scope.changeVal = '';
                } else {
                    $scope.changeVal = val;
                }
            };

            // 删除用户
            $scope.delUser = function(uid){
                var oAlert = JZY.component.ModalDialog({
                    title: '提示信息',
                    msg: '确认删除此用户吗？',
                    masker: '<div class="modal-backdrop fade"></div>',
                    btnArr: [
                        {
                            name: '取消', className: 'btn-default', callback: function(){}
                        },
                        {
                            name: '确认', className: 'btn-primary', callback: function(){
                                if (uid && uid > 0){ // 有效ID
                                    $http({
                                        method: 'GET',
                                        url: '/edituser/del',
                                        params: {id: uid}
                                    }).
                                    success(function(data){
                                        console.log(data);
                                        if (data.errCode == 1){
                                            for (var i = 0; i < $scope.userList.length; i++){
                                                if ($scope.userList[i].id == uid){
                                                    // 删除数据
                                                    $scope.userList.splice(i, 1);
                                                    break;
                                                }
                                            }
                                        } else {
                                            var oAlert2 = JZY.component.ModalDialog({
                                                title: '提示信息',
                                                msg: data.Msg,
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
                                }
                            }
                        }
                    ]
                });
                oAlert.init();
            };
        }]
    });