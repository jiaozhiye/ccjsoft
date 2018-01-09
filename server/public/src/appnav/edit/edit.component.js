/**
 * @Author: jzy
 * @Date: 2017/7/3
 * @Last Modified by: jzy
 * @Last Modified time: 2017/7/3
 */
// 注册 `editAppnav` 组件, 与其相关的控制器和模版
angular.module('myApp.appnav.edit').
    component('editAppnav', {
        templateUrl: './src/appnav/edit/edit.template.html',
        controller: ['$scope', '$http', function EditAppnavCtrl($scope, $http){
            $scope.navList = [];

            $http({
                method: 'GET',
                url: '/editnav/get'
            }).
            then(function(resp){
                var data = resp.data;
                //console.log(data);
                if (data.errCode == 1){
                    for (var i = 0; i < data.info.length; i++){
                        $scope.navList.push(data.info[i]);
                        for (var k = 0; k < data.info[i].list.length; k++){
                            data.info[i].list[k].name = '　' + data.info[i].list[k].name;
                            $scope.navList.push(data.info[i].list[k]);
                        }
                    }
                    console.log($scope.navList);
                } else {

                }
            },
            function(resp){
                throw resp.statusText;
            });

            // 修改排序
            $scope.modOrder = function(v){
                //console.log('id是：' + v);
                var order_list;
                for (var i = 0; i < $scope.navList.length; i++){
                    if (v == $scope.navList[i].id){
                        order_list = $scope.navList[i].order_list;
                        break;
                    }
                }
                if (typeof order_list == 'undefined'){
                    return;
                }
                $http({
                    method: 'GET',
                    url: '/editnav/order',
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

            // 删除导航分类
            $scope.delNav = function(v){
                var oAlert = JZY.component.ModalDialog({
                    title: '提示信息',
                    msg: '确认删除此导航分类吗？',
                    masker: '<div class="modal-backdrop fade"></div>',
                    btnArr: [
                        {
                            name: '取消', className: 'btn-default', callback: function(){}
                        },
                        {
                            name: '确认', className: 'btn-primary', callback: function(){
                            $http({
                                method: 'GET',
                                url: '/editnav/del',
                                params: {
                                    id: v
                                }
                            }).
                            then(function(resp){
                                var data = resp.data;
                                console.log(data);
                                if (data.errCode == 1){
                                    for (var i = 0; i < $scope.navList.length; i++){
                                        if ($scope.navList[i].id == v){
                                            $scope.navList.splice(i, 1);
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