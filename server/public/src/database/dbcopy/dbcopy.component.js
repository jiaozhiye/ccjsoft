/**
 * @Author: jzy
 * @Date: 2016/12/31
 * @Last Modified by: jzy
 * @Last Modified time: 2016/12/31
 */
// 注册 `dbcopy` 组件, 与其相关的控制器和模版
angular.module('myApp.dbcopy').
    component('dbCopy', {
        templateUrl: './src/database/dbcopy/dbcopy.template.html',
        controller: ['$scope', '$http', function DbCopyCtrl($scope, $http){
            $scope.dataList = [];

            // 获取数据表信息
            $http({
                method: 'GET',
                url: '/dbcopy/get'
            }).then(function(resp){
                var data = resp.data;
                if (data.errCode == 1){
                    console.log(data.info);
                    for (var i = 0; i < data.info.length; i++){
                        data.info[i]['isCk'] = true;
                    }
                    $scope.dataList = data.info;
                } else {

                }
            }, function(resp){
                throw resp.statusText;
            });

            // 备份表
            $scope.copyFn = function(){
                var _dataArr = getParams();
                if (_dataArr.length == 0){
                    return;
                }
                $http({
                    method: 'GET',
                    url: '/dbcopy/copy',
                    params: _dataArr
                }).then(function(resp){
                    var data = resp.data;
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
                }, function(resp){
                    throw resp.statusText;
                });
            };

            // 优化表
            $scope.optimizeFn = function(name){
                var _dataArr = [];
                if (name){
                    _dataArr.push(name);
                } else {
                    _dataArr = getParams();
                }
                if (_dataArr.length == 0){
                    return;
                }
                $http({
                    method: 'GET',
                    url: '/dbcopy/optimize',
                    params: _dataArr
                }).then(function(resp){
                    var data = resp.data;
                    var oAlert3 = JZY.component.ModalDialog({
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
                    oAlert3.init();
                }, function(resp){
                    throw resp.statusText;
                });
            };

            // 修复表
            $scope.repairFn = function(name){
                var _dataArr = [];
                if (name){
                    _dataArr.push(name);
                } else {
                    _dataArr = getParams();
                }
                $http({
                    method: 'GET',
                    url: '/dbcopy/repair',
                    params: _dataArr
                }).then(function(resp){
                    var data = resp.data;
                    var oAlert4 = JZY.component.ModalDialog({
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
                    oAlert4.init();
                }, function(resp){
                    throw resp.statusText;
                });
            };

            // 获取参数
            var getParams = function(){
                var tArr = [];
                for (var i = 0; i < $scope.dataList.length; i++){
                    if ($scope.dataList[i].isCk == true){
                        tArr.push($scope.dataList[i].tName);
                    }
                }

                if (tArr.length == 0){
                    var oAlert = JZY.component.ModalDialog({
                        title: '提示信息',
                        msg: '请选择需要备份的表',
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

                return tArr;
            };
        }]
    });