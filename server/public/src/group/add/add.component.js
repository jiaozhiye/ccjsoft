/**
 * @Author: Jzy
 * @Date: 2016/12/15
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/12/15
 */
'use strict';

// 注册 `addGroup` 组件, 与其相关的控制器和模版
angular.module('myApp.group.add').
    component('addGroup', {
        templateUrl: './src/group/add/add.template.html',
        controller: ['$scope', '$http', '$location', 'formVerify', function AddGroupCtrl($scope, $http, $location, formVerify){
            // 获取系统分类列表 => 设置其权限
            $http({
                method: 'GET',
                url: '/addgroup/getnav'
            }).
            success(function(data){
                console.log(data);
                if (data.errCode == 1){
                    $scope.navList = data.info;
                } else {

                }
            }).
            error(function(err){
                throw err;
            });

            // 在作用域下挂载 conf 对象，用于接收权限的 checkbox 数据
            $scope.conf = {};

            $scope.addInfo = function(){
                //console.log($scope.navList);
                if (!($scope.navList.length && $scope.navList.length > 0)){
                    return;
                }
                var confJson = {};
                for (var i = 0; i < $scope.navList.length; i++){
                    confJson[$scope.navList[i].mark] = false;
                }
                //console.log(confJson);
                //console.log($scope.conf);
                confJson = angular.extend(confJson, $scope.conf);
                // 把 confJson 数据转成 0 或 1
                for (var attr in confJson){
                    if (confJson[attr] == true){
                        confJson[attr] = 1;
                    } else {
                        confJson[attr] = 0;
                    }
                }
                console.log(confJson);
                // 添加用户组
                var _data = {
                    name: $scope.gname,
                    description: $scope.gdesc,
                    conf: confJson
                };

                $http({
                    method: 'POST',
                    url: '/addgroup/insert',
                    params: _data
                }).
                success(function(data){
                    if (data.errCode == 1){
                        // 添加成功，跳转到用户组的编辑页面
                        $location.path('/editgroup');
                    } else {
                        var oAlert = JZY.component.ModalDialog({
                            title: '提示信息',
                            msg: data.errMsg,
                            masker: '<div class="modal-backdrop fade"></div>',
                            btnArr: [
                                {name: '取消', className: 'btn-default', callback: function(){}},
                                {name: '确认', className: 'btn-primary', callback: function(){}}
                            ]
                        });
                        oAlert.init();
                        return;
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