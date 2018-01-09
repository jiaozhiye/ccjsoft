/**
 * @Author: jzy
 * @Date: 2017/7/3
 * @Last Modified by: jzy
 * @Last Modified time: 2017/7/3
 */
// 注册 `modAppnav` 组件, 与其相关的控制器和模版
angular.module('myApp.appnav.mod').
    component('modAppnav', {
        templateUrl: './src/appnav/mod/mod.template.html',
        controller: ['$scope', '$http', '$routeParams', '$location', 'formVerify', function ModAppnavCtrl($scope, $http, $routeParams, $location, formVerify){
            if (!($routeParams.id && $routeParams.id > 0)){
                return;
            }

            $http({
                method: 'GET',
                url: '/modnav/getone',
                params: {
                    id: $routeParams.id
                }
            }).
            then(function(resp){
                var data = resp.data;
                console.log(data);
                if (data.errCode == 1){
                    $scope.navid = data.info.pid; // 父类ID
                    $scope.navname = data.info.name;
                    $scope.navmark = data.info.mark;
                    $scope.navdisable = !data.info.disable;
                } else {

                }
            }, function(resp){
                throw resp.statusText;
            });

            // 修改
            $scope.modInfo = function(){
                $http({
                    method: 'GET',
                    url: '/modnav/update',
                    params: {
                        id: $routeParams.id,
                        pid: $scope.navid,
                        name: $scope.navname,
                        mark: $scope.navmark,
                        disable: $scope.navdisable ? 0 : 1
                    }
                }).
                then(function(resp){
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
                                {name: '取消', className: 'btn-default', callback: function(){}},
                                {name: '确认', className: 'btn-primary', callback: function(){}}
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