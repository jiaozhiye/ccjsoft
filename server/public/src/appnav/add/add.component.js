/**
 * @Author: jzy
 * @Date: 2017/7/2
 * @Last Modified by: jzy
 * @Last Modified time: 2017/7/2
 */
// 注册 `addAppnav` 组件, 与其相关的控制器和模版
angular.module('myApp.appnav.add').
    component('addAppnav', {
        templateUrl: './src/appnav/add/add.template.html',
        controller: ['$scope', '$http', '$location', 'formVerify', function AddAppnavCtrl($scope, $http, $location, formVerify) {
            // 默认显示应用根导航
            $scope.navid = 0;

            $scope.addInfo = function(){
                if (typeof $scope.navname == 'undefined' || $scope.navname == ''){
                    return;
                }
                if (!$scope.navname){
                    $scope.navnam = '';
                }
                $http({
                    method: 'GET',
                    url: '/addnav/add',
                    params: {
                        pid: $scope.navid,
                        name: $scope.navname,
                        mark: $scope.navmark
                    }
                }).then(function(resp){
                    var data = resp.data;
                    console.log(data);
                    if (data.errCode == 1){
                        $location.path('/editnav');
                    } else {
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
                    }
                }, function(resp){
                    throw resp.statusText;
                });
            };

            // 绑定校验服务到 $scope 上
            for (var attr in formVerify){
                $scope[attr] = formVerify[attr];
                $scope[attr].regVal = 'pass';
            }
        }]
    });