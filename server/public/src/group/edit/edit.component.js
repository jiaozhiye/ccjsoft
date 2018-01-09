/**
 * @Author: Jzy
 * @Date: 2016/12/15
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/12/15
 */
'use strict';

// 注册 `editGroup` 组件, 与其相关的控制器和模版
angular.module('myApp.group.edit').
    component('editGroup', {
        templateUrl: './src/group/edit/edit.template.html',
        controller: ['$scope', '$http', function EditGroupCtrl($scope, $http){
            // 获取用户组信息
            $http({
                method: 'GET',
                url: '/editgroup/get'
            }).
            success(function(data){
                console.log(data);
                if (data.errCode == 1){
                    $scope.groupList = data.info;
                } else {

                }
            });

            $scope.delGroup = function(gid){
                var oAlert = JZY.component.ModalDialog({
                    title: '提示信息',
                    msg: '确认删除此用户组吗？',
                    masker: '<div class="modal-backdrop fade"></div>',
                    btnArr: [
                        {
                            name: '取消', className: 'btn-default', callback: function(){}
                        },
                        {
                            name: '确认', className: 'btn-primary', callback: function(){
                                if (gid && gid > 0){ // 有效ID
                                    $http({
                                        method: 'GET',
                                        url: '/editgroup/del',
                                        params: {id: gid}
                                    }).
                                    success(function(data){
                                        console.log(data);
                                        if (data.errCode == 1){
                                            for (var i = 0; i < $scope.groupList.length; i++){
                                                if ($scope.groupList[i].id == gid){
                                                    // 删除数据
                                                    $scope.groupList.splice(i, 1);
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