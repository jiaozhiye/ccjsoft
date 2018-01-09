/**
 * @Author: Jzy
 * @Date: 2016/12/15
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/12/15
 */
'use strict';

// 注册 `addClassify` 组件, 与其相关的控制器和模版
angular.module('myApp.classify.add').
    component('addClassify', {
        templateUrl: './src/classify/add/add.template.html',
        controller: ['$scope', '$http', '$location', 'formVerify', function AddClassifyCtrl($scope, $http, $location, formVerify){
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

            // 上传分类信息
            $scope.addInfo = function(){
                if (typeof $scope.classname == 'undefined'){
                    return;
                }
                var filename = $scope.picResps.length > 0 ? $scope.picResps[0].fileName : '';
                //console.log(filename);
                $http({
                    method: 'POST',
                    url: '/addclassify/insert',
                    params: {
                        pid: $scope.classid,
                        title: $scope.classname,
                        description: $scope.classdesc,
                        arcpicsize: $scope.arcpicsize,
                        path: filename
                    }
                }).
                then(function(resp){
                    var data = resp.data;
                    console.log(data);
                    if (data.errCode == 1){
                        $location.path('/editclassify');
                    } else {

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