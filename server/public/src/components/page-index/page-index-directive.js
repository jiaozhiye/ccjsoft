/**
 * @Author: Jzy
 * @Date: 2016/12/19
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/12/19
 */
'use strict';

angular.module('myApp.pageIndex.page-index-directive', []).
    directive('pageIndex', [function(){
        return {
            restrict: 'EA', // 元素 属性
            replace: true,  // 替换指令标签
            scope: { // 隔离作用域
                init: '&myInit',
                getData: '&myGetdata'
            },
            templateUrl: './src/components/page-index/page-index.template.html', // 模版
            controller: ['$scope', function($scope){
                // ...
            }],
            link: function($scope, element, attr){
                $scope.init({cb: function(total, curindex){
                    // 实例化分页组件
                    var pageIndex = new JZY.component.PageIndex({
                        totalPage: total,
                        currentPage: curindex,
                        maxShowLength: 5,
                        $$wrapper: element,
                        selectIndexCallback: function(index, noPrevIndex, noBackIndex){
                            $scope.getData({cur: index});
                        }
                    });
                    pageIndex.init();
                }});
            }
        };
    }]);