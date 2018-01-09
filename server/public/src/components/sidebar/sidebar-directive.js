/**
 * @Author: jzy
 * @Date: 2016/12/11
 * @Last Modified by: jzy
 * @Last Modified time: 2016/12/11
 */
'use strict';

// 定义侧栏模块
angular.module('myApp.sidebar.sidebar-directive', []).
    // 自定义侧栏指令
    directive('appSidebar', [function(){
        return {
            restrict: 'EA', // 元素 属性
            replace: true,  // 替换指令标签
            scope: true, // 独立作用域，默认共享作用域
            templateUrl: './src/components/sidebar/sidebar-template.html', // 模版
            controller: ['$scope', '$http', '$location', function($scope, $http, $location){
                //console.log($location);
                var oRegExp = new RegExp($location.$$path + '$');
                //console.log(oRegExp);

                // 处理数据
                var activeFn = function(arr){
                    for (var i = 0; i < arr.length; i++){
                        if (arr[i].list.length > 0){
                            for (var k = 0, len = arr[i].list.length; k < len; k++){
                                if (oRegExp.test(arr[i].list[k].link)){ // 判断系统分类锁定
                                    arr[i].isActive = 1;
                                    arr[i].list[k].isActive = 1;
                                    //break;
                                    return arr;
                                }
                            }
                        }
                    }
                    return arr;
                };

                // 发起ajax请求
                $http({
                    method: 'GET',
                    url: '/home/sidebar'
                }).
                success(function(data){
                    //console.log(data);
                    if (data.errCode == 1){ // 数据有效
                        $scope.dataList = activeFn(data.info);
                        console.log($scope.dataList);
                    } else {
                        throw new Error(data.errMsg);
                    }
                }).
                error(function(err){
                    throw err;
                });
            }],
            link: function(scope, element, attr){
                // SideBar 组件调用
                var oSidebar = new JZY.component.SideBar({
                    $$wrapper: $('body'),
                    $$tapElement: $(element),
                    $$sideBarBtn: $('.navbar-brand'),
                    isDisplay: false,
                    callback: function(v){
                        //console.log(v);
                    }
                });
                oSidebar.install();
            }
        };
    }]);