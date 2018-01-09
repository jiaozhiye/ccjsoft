/**
 * @Author: Jzy
 * @Date: 2016/12/15
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/12/15
 */
'use strict';

// 注册 `editArticle` 组件, 与其相关的控制器和模版
angular.module('myApp.article.edit').
    component('editArticle', {
        templateUrl: './src/article/edit/edit.template.html',
        controller: ['$scope', '$http', function EditArticleCtrl($scope, $http){
            // 每页显示多少条数据
            var shownum  = 10;
            // 当前显示第几页
            var curindex = 1;

            // 分页初始化
            $scope.pageInit = function(callback){
                $http({
                    method: 'GET',
                    url: '/editarticle/total'
                }).
                then(function(resp){
                    var data = resp.data;
                    //console.log(data);
                    if (data.errCode == 1){
                        var total = Math.ceil(data.total / shownum);
						if (total == 0){
                            return;
                        }
                        curindex = curindex <= total ? curindex : total;
                        $scope.getList(curindex);
                        callback && callback(total, curindex);
                    } else {

                    }
                }, function(resp){
                    throw resp.statusText;
                });
            };

            // 获取每一页数据
            $scope.getList = function(cur){
                if (cur > $scope.total){
                    return;
                }
                // 获取文章列表数据
                $http({
                    method: 'GET',
                    url: '/editarticle/get',
                    params: {
                        curpage: cur,
                        pagenum: shownum
                    }
                }).
                then(function(resp){
                    var data = resp.data;
                    console.log(data);
                    if (data.errCode == 1){
                        $scope.infoList = data.info;
                    } else {

                    }
                }, function(resp){
                    throw resp.statusText;
                });
            };

            // 执行搜索按钮的过滤操作
            $scope.filterFn = function(val){
                $scope.searchVal = val;
            };

            $scope.onlynum = function(ev){
                var code = ev.keyCode;
                //console.log(code);
                if (!(code >= 48 && code <= 57 || code == 8 || code == 37 || code == 39)){
                    ev.preventDefault();
                    return false;
                }
            };

            // 修改排序
            $scope.modOrder = function(v){
                //console.log('id是：' + v);
                var order_list;
                for (var i = 0; i < $scope.infoList.length; i++){
                    if (v == $scope.infoList[i].id){
                        order_list = $scope.infoList[i].order_list;
                        break;
                    }
                }
                if (typeof order_list == 'undefined'){
                    return;
                }
                $http({
                    method: 'GET',
                    url: '/editarticle/order',
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

            // 删除分类
            $scope.delArticle = function(id){
                var oAlert = JZY.component.ModalDialog({
                    title: '提示信息',
                    msg: '确认删除此文章吗？',
                    masker: '<div class="modal-backdrop fade"></div>',
                    btnArr: [
                        {
                            name: '取消', className: 'btn-default', callback: function(){}
                        },
                        {
                            name: '确认', className: 'btn-primary', callback: function(){
                                $http({
                                    method: 'GET',
                                    url: '/editarticle/del',
                                    params: {
                                        id: id
                                    }
                                }).
                                then(function(resp){
                                    var data = resp.data;
                                    console.log(data);
                                    if (data.errCode == 1){
                                        for (var i = 0; i < $scope.infoList.length; i++){
                                            if ($scope.infoList[i].id == id){
                                                $scope.infoList.splice(i, 1);
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
        }]
    });