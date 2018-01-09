/**
 * @Author: jzy
 * @Date: 2016/12/31
 * @Last Modified by: jzy
 * @Last Modified time: 2016/12/31
 */
// 注册 `dbcopy` 组件, 与其相关的控制器和模版
angular.module('myApp.dbrestore').
    component('dbRestore', {
        templateUrl: './src/database/dbrestore/dbrestore.template.html',
        controller: ['$scope', '$http', function DbCopyCtrl($scope, $http){
            $scope.dataList = [];
            // 模态框对象
            var oAlert = null;

            // 获取数据表信息
            $http({
                method: 'GET',
                url: '/dbrestore/get'
            }).then(function(resp){
                var data = resp.data;
                if (data.errCode == 1){
                    console.log(data.info);
                    for (var i = 0; i < data.info.length; i++){
                        data.info[i]['isCk'] = false;
                    }
                    $scope.dataList = data.info;
                } else {

                }
            }, function(resp){
                throw resp.statusText;
            });

            // 还原备份
            $scope.restoreFn = function(name){
                if (!name){
                    return;
                }
                oAlert = JZY.component.ModalDialog({
                    title: '提示信息',
                    msg: '确定要恢复备份数据吗？',
                    masker: '<div class="modal-backdrop fade"></div>',
                    btnArr: [
                        {
                            name: '取消', className: 'btn-default', callback: function(){}
                        },
                        {
                            name: '确认', className: 'btn-primary', callback: function(){
                                $http({
                                    method: 'GET',
                                    url: '/dbrestore/restore',
                                    params: {
                                        fName: name
                                    }
                                }).then(function(resp){
                                    var data = resp.data;
                                    console.log(data);
                                    oAlert = JZY.component.ModalDialog({
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

            // 删除备份
            $scope.delFn = function(dir){
                var _dataArr = [];
                if (dir){
                    _dataArr.push(dir);
                } else {
                    _dataArr = getParams();
                }
                if (_dataArr.length == 0){
                    return;
                }
                oAlert = JZY.component.ModalDialog({
                    title: '提示信息',
                    msg: '确定要删除备份数据吗？',
                    masker: '<div class="modal-backdrop fade"></div>',
                    btnArr: [
                        {
                            name: '取消', className: 'btn-default', callback: function(){}
                        },
                        {
                            name: '确认', className: 'btn-primary', callback: function(){
                                $http({
                                    method: 'GET',
                                    url: '/dbrestore/del',
                                    params: _dataArr
                                }).then(function(resp){
                                    var data = resp.data;
                                    for (var i = 0; i < $scope.dataList.length; i++){
                                        for (var j = 0; j < _dataArr.length; j++){
                                            if (_dataArr[j] == $scope.dataList[i].fName){
                                                $scope.dataList.splice(i, 1);
                                                if (--i < 0){
                                                    i = 0;
                                                }
                                            }
                                        }
                                    }
                                    oAlert = JZY.component.ModalDialog({
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

            // 获取参数
            var getParams = function(){
                var tArr = [];
                for (var i = 0; i < $scope.dataList.length; i++){
                    if ($scope.dataList[i].isCk == true){
                        tArr.push($scope.dataList[i].fName);
                    }
                }

                if (tArr.length == 0){
                    oAlert = JZY.component.ModalDialog({
                        title: '提示信息',
                        msg: '请选择需要删除的备份数据',
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