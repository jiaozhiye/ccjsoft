/**
 * @Author: jzy
 * @Date: 2017/1/14
 * @Last Modified by: jzy
 * @Last Modified time: 2017/1/14
 */
'use strict';

angular.module('myApp.upload.upload-directive', ['myApp.service.removedRecordService']).
    directive('appUpload', ['removedRecordService', function(removedRecordService){
        return {
            restrict: 'EA', // 元素 属性
            replace: true,  // 替换指令标签
            scope: { // 隔离作用域
                params: '=myParams',
                resps: '=myResps',
                def: '=myDef',
                imgsize: '@myImgsize'
            },
            templateUrl: './src/components/upload/upload-template.html', // 模版
            controller: ['$scope', '$http', '$q', function UploadCtrl($scope, $http, $q){
                // 存储文件信息
                $scope.fileList = [];
                // 存储uploader组件 response 信息
                $scope.resps = $scope.resps || [];
                //console.log($scope.resps);
                // 延迟对象
                $scope.def = $q.defer();
                $scope.def.promise.then(function(){
                    //console.log($scope.resps);
                    for (var i = 0; i < $scope.resps.length; i++){
                        $scope.fileList.push({
                            id: i,
                            name: $scope.resps[i].fileName,
                            size: '已完成',
                            percent: '100%'
                        });
                    }
                }, function(){
                    console.error('延迟对象执行有误');
                });
                //$scope.def.resolve();

                // 参数集合
                var params = {
                    flash_swf_url: 'bower_components/plupload/js/Moxie.swf', // swf文件，当需要使用swf方式进行上传时需要配置该参数
                    silverlight_xap_url: 'bower_components/plupload/js/Moxie.xap' // silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
                };
                // 把 params 扩展到 $scope.params 上
                angular.extend($scope.params, params);
                // 指定文件类型
                $scope.fileFormat = $scope.params.filters.mime_types[0].extensions;

                // 默认定义过上传图片的尺寸
				if (typeof $scope.params.resize != 'undefined'){
					$scope.picSize = $scope.params.resize.width + '*' + $scope.params.resize.height;
				}

                // 监听图片尺寸变化
                $scope.$on('picSize', function(ev, val){
                    $scope.params.resize = undefined;
                    if ($scope.imgsize == 'true'){
                        $scope.picSize = val;
                        var tArr = $scope.picSize.split('*');
                        if (tArr.length == 2){
                            var iwidth  = parseInt(tArr[0]),
                                iHeight = parseInt(tArr[1]);
                            if (iwidth > 0 && iHeight > 0){
                                $scope.params.resize = {
                                    width: iwidth,
                                    height: iHeight,
                                    crop: true,
                                    quality: 80,
                                    preserve_headers: false
                                };
                            }
                        }
                    }
                    // 重新设定特定的配置参数
                    $scope.uploader.setOption($scope.params);
                });

                // 每次加载此组件，先清空记录
                removedRecordService.delRecord();

                // 移除上传文件
                $scope.removeFile = function(fileid){
                    if (typeof fileid == 'number'){
                        for (var i = 0; i < $scope.fileList.length; i++){
                            if ($scope.fileList[i].id == fileid){
                                // 添加删除文件的路径
                                removedRecordService.addRecord($scope.resps[i].filePath);
                                if (!!$scope.resps[i].thumbPath){
                                    removedRecordService.addRecord($scope.resps[i].thumbPath);
                                }
                                $scope.fileList.splice(i, 1);
                                $scope.resps.splice(i, 1);
                                break;
                            }
                        }
                    } else {
                        // 从上传队列中移除文件  参数是文件ID 或 文件对象
                        $scope.uploader.removeFile(fileid);
                    }
                };

                // 发起 ajax 请求，删除临时上传文件
                $scope.delFile = function(fileName, index){
                    $http({
                        method: 'GET',
                        url: '/upload/del',
                        params: {
                            filename: fileName
                        }
                    }).then(function(resp){
                        var data = resp.data;
                        //console.log(data);
                        if (data.errCode == 1){
                            // 删除对应的文件信息
                            $scope.fileList.splice(index, 1);
                            // 删除对应的相应信息
                            $scope.resps.splice(index, 1);
                        } else {

                        }
                    }, function(resp){
                        throw resp.statusText;
                    });
                };

                // 点击展示大图
                $scope.showFullPic = function(fpath){
                    if (!fpath){
                        return;
                    }
                    var oAlert = JZY.component.ModalImgDialog({
                        imgUrl: fpath
                    });
                    oAlert.init();
                }
            }],
            link: function($scope, ele, attrs, ctrl){
                // 上传按钮元素，原生js节点
                $scope.params.browse_button = ele.find('button')[0];
                // 参数初始化
                $scope.params.init = {
                    FilesAdded: function(up, files){
                        //console.log(files);
                        if (files.length > $scope.params.uploadLen){
                            files.length    = $scope.params.uploadLen;
                            up.files.length = $scope.params.uploadLen;
                        }
                        for (var i = 0; i < files.length; i++){
                            $scope.fileList.push({
                                id: files[i].id, // 文件ID
                                name: files[i].name, // 文件名
                                size: (files[i].size / 1024).toFixed(2) + 'K', // 文件大小
                                percent: '0%', // 上传进度
                                bytesPerSec: '0K/s' // 上传速率
                            });
                        }
                        // 触发脏检查
                        $scope.$apply();
                        // 文件添加之后，开始执行上传
                        up.start();
                    },
                    UploadProgress: function(up, file){
                        for (var i = 0; i < $scope.fileList.length; i++){
                            if ($scope.fileList[i].id == file.id){
                                // 更新百分比和速率
                                $scope.fileList[i].percent = file.percent + '%';
                                $scope.fileList[i].bytesPerSec = file.percent == 100 ? '' : (uploader.total.bytesPerSec / 1024).toFixed(2) + 'K/s';
                                break;
                            }
                        }
                        try {
                            //$scope.$apply();
                            setTimeout(function(){
                                $scope.$apply();
                            }, 0);
                        } catch (e){
                            throw new Error('\nError #' + e.name + ': ' + e.message);
                        }
                    },
                    FileUploaded: function(up, file, responseObject){
                        // 注意，要从服务器返回图片信息
                        var res = responseObject.response;
                        // 先将图片的相应信息存储来，待所有图片都上传完了，再统一处理
                        $scope.resps.push(JSON.parse(res));
                        // 触发脏检查
                        $scope.$apply();
                    },
                    UploadComplete: function(up, files){
                        console.log('所有图片上传完成');
                        console.log($scope.resps);
                    },
                    FilesRemoved: function(up, files){
                        // 假设正在上传
                        var isUploadding = true;

                        for (var i = 0; i < $scope.resps.length; i++){
                            if (files[0].name == $scope.resps[i].originFileName){
                                // 说明已上传完毕
                                isUploadding = false;
                                // 删除文件
                                $scope.delFile($scope.resps[i].fileName, i);
                                break;
                            }
                        }

                        if (isUploadding){
                            for (var i = 0; i < $scope.fileList.length; i++){
                                if (files[0].id == $scope.fileList[i].id){
                                    $scope.fileList.splice(i, 1);
                                    break;
                                }
                            }
                        }
                    },
                    Error: function(up, err){
                        // Called when error occurs
                        throw new Error('\nError #' + err.code + ': ' + err.message);
                    }
                };

                // 实例化对象   挂载
                $scope.uploader = new plupload.Uploader($scope.params);
                $scope.uploader.init();
            }
        };
    }]);