/**
 * @Author: Jzy
 * @Date: 2016/12/15
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/12/15
 */
'use strict';

// 注册 `modArticle` 组件, 与其相关的控制器和模版
angular.module('myApp.article.mod').
    component('modArticle', {
        templateUrl: './src/article/mod/mod.template.html',
        controller: ['$scope', '$http', '$location', '$routeParams', 'formVerify', 'removedRecordService', function ModArticleCtrl($scope, $http, $location, $routeParams, formVerify, removedRecordService){
            if (!($routeParams.id && $routeParams.id > 0)){
                return;
            }

            // 获取数据
            $http({
                method: 'GET',
                url: '/modarticle/get',
                params: {
                    id: $routeParams.id
                }
            }).
            then(function(resp){
                var data = resp.data;
                console.log(data);
                if (data.errCode == 1){
                    for (var attr in data.info){
                        $scope[attr] = data.info[attr];
                    }
                    // 初始化编辑器的内容
                    editor.$txt.html($scope.content);
                    $scope.disable = !data.info.disable;
                    // 获取上传文件信息
                    getUploadDate();
                    //
                    $scope.picDefer.resolve();
                    $scope.fileDefer.resolve();
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
                for (var i = 0; i < $scope.files.length; i++){
                    if ($scope.files[i] != ''){
                        $scope.fileResps.push({
                            fileName: $scope.files[i].match(/\d+_\d{4}\.[a-zA-Z]+$/)[0],
                            filePath: $scope.files[i]
                        });
                    }
                }
            };

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
                $scope.content = this.$txt.html();
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

            // 修改文章数据
            $scope.modInfo = function(){
                // 文章标题为空
                if (typeof $scope.title == 'undefined'){
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
                    url: '/modarticle/update',
                    params: {
                        id: $routeParams.id,
                        cid: $scope.cid,
                        title: $scope.title,
                        desc: $scope.description || '',
                        content: $scope.content || '',
                        path: picpath,
                        fpath: filepath.join(','),
                        disable: $scope.disable ? 0 : 1
                    }
                }).
                then(function(resp){
                    var data = resp.data;
                    console.log(data);
                    if (data.errCode == 1){
                        $scope.removeFileFn();
                        $location.path('/editarticle');
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
                    url: '/modarticle/delfile',
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