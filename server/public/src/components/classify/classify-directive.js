/**
 * @Author: Jzy
 * @Date: 2016/12/16
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/12/16
 */
'use strict';

angular.module('myApp.classify.classify-directive', ['myApp.service.arcPicSizeService']).
    directive('appClassify', [function(){
        return {
            restrict: 'EA', // 元素 属性
            replace: true,  // 替换指令标签
            scope: {
                classid: '=', // 父类ID
                rootclass: '@'
            },
            templateUrl: './src/components/classify/classify-template.html', // 模版
            controller: ['$scope', '$http', '$timeout', 'arcPicSizeService', function($scope, $http, $timeout, arcPicSizeService){
                //console.log($scope.rootclass);
                //console.log($scope.classid);
                var findValue = function(arr, val){
                    for (var i = 0; i < arr.length; i++){
                        if (val == arr[i].id){
                            return arr[i];
                        }
                    }
                    return null;
                };

                // 监听分类切换
                $scope.changeHandle = function(){
                    var _this = this;
                    $timeout(function(){
                        var curClassInfo = findValue(_this.classList, _this.classid);
                        if (curClassInfo != null && curClassInfo.size){
                            arcPicSizeService.change(curClassInfo.size);
                        } else {
                            arcPicSizeService.change('');
                        }
                    }, 0);
                };

                $http({
                    method: 'GET',
                    url: '/addclassify/get'
                }).
                then(function(resp){
                    var data = resp.data;
                    //console.log(data);
                    if (data.errCode == 1){
                        var depth = -1;
                        for (var i = 0; i < data.info.length; i++){
                            if (depth != -1){
                                if (data.info[i].absdepth > depth){
                                    data.info.splice(i--, 1);
                                    continue;
                                } else {
                                    depth = -1;
                                }
                            }
                            if (depth == -1 && data.info[i].disable != 1){ // 说明分类不可用
                                depth = data.info[i].absdepth;
                                data.info.splice(i--, 1);
                            }
                        }

                        if ($scope.rootclass == '0'){ // 为真，不要根分类
                            data.info.splice(0, 1);
                        }

                        $scope.classList = data.info;
                        $scope.classid   = $scope.classid ? $scope.classid : $scope.classList[0].id;

                        // 判断分类是否可用
                        var index = $scope.classList.findIndex(function(ele){
                            return ele.id == $scope.classid;
                        });
                        if (index != -1){
                            var size = findValue($scope.classList, $scope.classid).size;
                            size ? arcPicSizeService.change(size) : arcPicSizeService.change('');
                        } else {
                            var oAlert = JZY.component.ModalDialog({
                                title: '提示信息',
                                msg: '分类不存在~~~',
                                masker: '<div class="modal-backdrop fade"></div>',
                                btnArr: [
                                    {
                                        name: '取消', className: 'btn-default', callback: function(){}
                                    },
                                    {
                                        name: '确认', className: 'btn-primary', callback: function(){
                                        // 重置分类
                                        $scope.classid = $scope.classList[0].id;
                                        $scope.$apply();
                                    }
                                    }
                                ]
                            });
                            oAlert.init();
                        }
                    } else {

                    }
                }, function(resp){
                    throw resp.statusText;
                });
            }]
        };
    }]);