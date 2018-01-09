/**
 * @Author: jzy
 * @Date: 2016/12/11
 * @Last Modified by: jzy
 * @Last Modified time: 2016/12/11
 */
'use strict';

// Register `sysInfo` component, along with its associated controller and template
// 注册 `sysInfo` 组件, 与其相关的控制器和模版
angular.module('myApp.sysinfo').
    component('sysInfo', {
        templateUrl: './src/sysconfig/sysinfo/sysinfo.template.html',
        controller: ['$scope', '$http', function SysInfoCtrl($scope, $http){
            $http({
                method: 'GET',
                url: '/sysinfo'
            })
            .success(function(data){
                if (data.errCode == 1){ // 数据有效
                    $scope.dataList = data.info;
                } else {
                    var oAlert = JZY.component.ModalDialog({
                        title: '提示信息',
                        msg: '系统信息获取失败',
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
            })
            .error(function(err){
                throw err;
            });
        }]
    });
