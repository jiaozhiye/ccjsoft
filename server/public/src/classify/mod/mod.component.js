/**
 * @Author: Jzy
 * @Date: 2016/12/15
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/12/15
 */
'use strict';

// 注册 `modClassify` 组件, 与其相关的控制器和模版
angular.module('myApp.classify.mod').
    component('modClassify', {
        templateUrl: './src/classify/mod/mod.template.html',
        controller: ['$scope', '$http', '$routeParams', '$location', 'formVerify', 'removedRecordService', function ModClassifyCtrl($scope, $http, $routeParams, $location, formVerify, removedRecordService){
            if (!($routeParams.id && $routeParams.id > 0)){
                return;
            }

            // 获取分类数据
            $http({
                method: 'GET',
                url: '/modclassify/get',
                params: {
                    id: $routeParams.id
                }
            }).
            then(function(resp){
                var data = resp.data;
                console.log(data);
                if (data.errCode == 1){
                    $scope.classid = data.info.pid; // 父类ID
                    $scope.classname = data.info.title;
                    $scope.classdesc = data.info.description;
                    $scope.classdisable = !data.info.disable;
                    $scope.arcpicsize = data.info.arcpicsize;
                    $scope.pic_path = data.info.path;
                    $scope.pic_thumb_path = data.info.thumb_path;
                    // 获取上传文件信息
                    getUploadDate();
                    //
                    $scope.picDefer.resolve();
                } else {

                }
            }, function(resp){
                throw resp.statusText;
            });


            // 获取上传文件信息
            var getUploadDate = function(){
                if ($scope.pic_path != ''){
                    $scope.picResps.push({
                        fileName: $scope.pic_path.match(/(thumb_)?\d+_\d{4}\.[a-zA-Z]+$/)[0],
                        filePath: $scope.pic_path,
                        thumbPath: $scope.pic_thumb_path
                    });
                }
            };

            // plupload 组件参数
            $scope.picUploadPara = {
                url: '/upload/do', // 服务器端的上传地址
                filters: {
                    mime_types: [
                        // 只允许上传图片文件  注意，extensions中，逗号后面不要加空格
                        {title: '图片文件', extensions: 'jpg,gif,png,bmp'}
                    ],
                    max_file_size: '1mb', // 最大只能上传500K的文件
                    prevent_duplicates: true // 不允许队列中存在重复文件
                },
                uploadLen: 1 // 限制上传文件数量，自定义
            };

            // 更新分类信息
            $scope.modInfo = function(){
                var filename = $scope.picResps.length > 0 ? $scope.picResps[0].fileName : '';
                var _data = {
                    id: $routeParams.id,
                    pid: $scope.classid,
                    title: $scope.classname,
                    description: $scope.classdesc,
                    arcpicsize: $scope.arcpicsize,
                    path: filename,
                    disable: $scope.classdisable ? 0 : 1
                };
                //console.log(_data);
                if (typeof _data.title == 'undefined'){
                    return;
                }
                $http({
                    method: 'POST',
                    url: '/modclassify/update',
                    params: _data
                }).
                then(function(resp){
                    var data = resp.data;
                    //console.log(data);
                    if (data.errCode == 1){
                        $scope.removeFileFn();
                        $location.path('/editclassify');
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

            $scope.removeFileFn = function(){
                var fpaths = removedRecordService.getRecord();
                if (!fpaths){
                    return;
                }
                $http({
                    method: 'GET',
                    url: '/modclassify/delfile',
                    params: {
                        paths: fpaths
                    }
                }).
                then(function(resp){
                    var data = resp.data;
                    console.log(data.errMsg);
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