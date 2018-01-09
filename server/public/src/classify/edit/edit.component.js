/**
 * @Author: Jzy
 * @Date: 2016/12/15
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/12/15
 */
'use strict';

// 注册 `editClassify` 组件, 与其相关的控制器和模版
angular.module('myApp.classify.edit').
    component('editClassify', {
        templateUrl: './src/classify/edit/edit.template.html',
        controller: ['$scope', '$http', '$location', function EditClassifyCtrl($scope, $http, $location){
            // 分类列表
            $scope.classList = [];

            $http({
                method: 'GET',
                url: '/addclassify/get'
            }).
            then(function(resp){
                var data = resp.data;
                console.log(data);
                if (data.errCode == 1){
                    $scope.classList = data.info.slice(1);
                } else {

                }
            }, function(resp){
                throw resp.statusText;
            });

            // 删除分类
            $scope.delClassify = function(cid){
                var oAlert = JZY.component.ModalDialog({
                    title: '提示信息',
                    msg: '确认删除此分类吗？',
                    masker: '<div class="modal-backdrop fade"></div>',
                    btnArr: [
                        {
                            name: '取消', className: 'btn-default', callback: function(){}
                        },
                        {
                            name: '确认', className: 'btn-primary', callback: function(){
                                $http({
                                    method: 'GET',
                                    url: '/editclassify/del',
                                    params: {
                                        id: cid
                                    }
                                }).
                                then(function(resp){
                                    var data = resp.data;
                                    console.log(data);
                                    if (data.errCode == 1){
                                        for (var i = 0; i < $scope.classList.length; i++){
                                            if ($scope.classList[i].id == cid){
                                                $scope.classList.splice(i, 1);
                                                break;
                                            }
                                        }
                                    }
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
                                }, function(resp){
                                    throw resp.statusText;
                                });
                            }
                        }
                    ]
                });
                oAlert.init();
            };

            // 修改排序
            $scope.modOrder = function(v){
                //console.log('id是：' + v);
                var order_list;
                for (var i = 0; i < $scope.classList.length; i++){
                    if (v == $scope.classList[i].id){
                        order_list = $scope.classList[i].order_list;
                        break;
                    }
                }
                if (typeof order_list == 'undefined'){
                    return;
                }
                $http({
                    method: 'GET',
                    url: '/editclassify/order',
                    params: {
                        id: v,
                        order: order_list
                    }
                }).
                then(function(resp){
                    var data = resp.data;
                    //console.log(data);
                    if (data.errCode == 1){
                        console.log(data.errMsg);
                    } else {

                    }
                }, function(resp){
                    throw resp.statusText;
                });
            };

            $scope.onlynum = function(ev){
                var code = ev.keyCode;
                //console.log(code);
                if (!(code >= 48 && code <= 57 || code == 8 || code == 37 || code == 39)){
                    ev.preventDefault();
                    return false;
                }
            };
        }]
    });