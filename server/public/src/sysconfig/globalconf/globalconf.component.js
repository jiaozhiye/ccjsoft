/**
 * @Author: jzy
 * @Date: 2016/12/11
 * @Last Modified by: jzy
 * @Last Modified time: 2016/12/11
 */
'use strict';

// 注册 `globalConf` 组件, 与其相关的控制器和模版
angular.module('myApp.globalconf').
    component('globalConf', {
        templateUrl: './src/sysconfig/globalconf/globalconf.template.html',
        controller: ['$scope', '$http', 'formVerify', function GlobalConfCtrl($scope, $http, formVerify){
            // 获取配置信息数据
            $http({
                method: 'GET',
                url: '/globalconf/get'
            })
                .success(function (data){
                    if (data.errCode == 1){ // 数据有效
                        //console.log(data);
                        $scope.dataList = data.info;
                    } else {
                        var oAlert = JZY.component.ModalDialog({
                            title: '提示信息',
                            msg: data.errMsg,
                            masker: '<div class="modal-backdrop fade"></div>',
                            btnArr: [
                                {
                                    name: '取消', className: 'btn-default', callback: function (){}
                                },
                                {
                                    name: '确认', className: 'btn-primary', callback: function (){}
                                }
                            ]
                        });
                        oAlert.init();
                    }
                })
                .error(function (err){
                    throw err;
                });

            // 提交修改信息
            $scope.modifyInfo = function (){
                var _data = {
                    id: $scope.dataList.id,
                    title: $scope.dataList.title,
                    keywords: $scope.dataList.keywords,
                    description: $scope.dataList.description,
                    copy: $scope.dataList.copy,
                    address: $scope.dataList.address,
                    phone: $scope.dataList.phone,
                    email: $scope.dataList.email,
                    records: $scope.dataList.records
                };
                if (typeof _data.title == 'undefined'){
                    return;
                }
                // 发起请求
                $http({
                    method: 'POST',
                    url: '/globalconf/set',
                    params: _data
                }).
                    success(function (data){
                        var oAlert3 = JZY.component.ModalDialog({
                            title: '提示信息',
                            msg: data.errMsg,
                            masker: '<div class="modal-backdrop fade"></div>',
                            btnArr: [
                                {
                                    name: '取消', className: 'btn-default', callback: function (){}
                                },
                                {
                                    name: '确认', className: 'btn-primary', callback: function (){}
                                }
                            ]
                        });
                        oAlert3.init();
                    }).
                    error(function (err){
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
