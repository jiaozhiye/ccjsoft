/**
 * @Author: Jzy
 * @Date: 2016/12/15
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/12/15
 */
'use strict';

// 注册 `addArticle` 组件, 与其相关的控制器和模版
angular.module('myApp.article.add').
    component('addArticle', {
        templateUrl: './src/article/add/add.template.html',
        controller: ['$scope', '$http', '$location', 'formVerify', '$timeout', function AddArticleCtrl($scope, $http, $location, formVerify, $timeout){
            // 实例化富文本编辑器
            var editor = new wangEditor('arc_content');
            // 上传图片
            editor.config.uploadImgUrl = '/upload/editor';
            // 配置自定义参数
            editor.config.uploadParams = {
                token: '图片上传',
                user: 'jzy'
            };
            // 设置 headers
            editor.config.uploadHeaders = {
                'Accept' : 'text/x-json'
            };
            // 配置百度地图密钥
            editor.config.mapAk = 'tf8LcjCjdtkAMPfq0t9c4dlE';
            editor.create();
            // 配置 onchange 事件
            editor.onchange = function(){
                // 编辑区域内容变化时，实时打印出当前内容
                //console.log(this.$txt.html());
                $scope.arccontent = this.$txt.html();
            };
            // ================================================
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

            $scope.fileUploadPara = {
                url: '/upload/do', // 服务器端的上传地址
                filters: {
                    mime_types: [
                        // 只允许上传图片文件  注意，extensions中，逗号后面不要加空格
                        {title: '附件文件', extensions: 'doc,xls,ppt,pdf,rar,zip'}
                    ],
                    max_file_size: '1000mb', // 最大只能上传500K的文件
                    prevent_duplicates: true // 不允许队列中存在重复文件
                },
                uploadLen: 3 // 限制上传文件数量，自定义
            };

            // 上传内容
            $scope.addInfo = function(){
                //console.log($scope.arctitle);
                // 文章标题为空
                if (typeof $scope.arctitle == 'undefined'){
                    $scope.regArticle.regVal = 'required';
                    // 通过 jQ 获得焦点
                    $('input[name="regArticle"]').focus();
                    return;
                }

                var picpath = $scope.picResps.length ? $scope.picResps[0].fileName : '';
                var filepath = $scope.fileResps.length ? $scope.fileResps : [];
                for (var i = 0; i < filepath.length; i++){
                    filepath[i] = filepath[i].fileName;
                }
                //console.log(filepath.join(','));
                $http({
                    method: 'POST',
                    url: '/addarticle/insert',
                    params: {
                        classid: $scope.classid,
                        title: $scope.arctitle,
                        desc: $scope.arcdesc || '',
                        content: $scope.arccontent || '',
                        path: picpath,
                        fpath: filepath.join(',')
                    }
                }).
                then(function(resp){
                    var data = resp.data;
                    console.log(data);
                    if (data.errCode == 1){
                        $location.path('/editarticle');
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