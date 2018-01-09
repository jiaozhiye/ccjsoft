/**
 * @Author: jzy
 * @Date: 2017/1/10
 * @Last Modified by: jzy
 * @Last Modified time: 2017/1/10
 */
var app = require('../app.js');
var express = require('express');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs-extra');
var gm = require('gm');
var dateFormat = require('dateformat');

// 路由对象
var router = express.Router();
router.prefix = '/upload';

// 暴露路由模块
module.exports = router;

/*
 * GET /upload/do
 */
router.post('/do', function (req, res){
    // creates a new incoming form
    var form = new formidable.IncomingForm();
    // 指定文件上传路径
    form.uploadDir = app.get('tempuploadpath');
    // 不处理空文件
    form.onPart = function (part){
        if (part.filename !== ''){
            form.handlePart(part);
        }
    }
    // 处理 request
    form.parse(req, function (err, fields, files){
        if (err){
            console.error('formidable error');
            return res.json({
                originFileName: '',
                fileName: '',
                filePath: ''
            });
        }
        //console.log(files);

        // 判断目标文件夹是否存在，false -> create
        if (!fs.existsSync(app.get('tempuploadpath'))){
            fs.mkdirSync(app.get('tempuploadpath'));
        }

        // 计算 files 长度
        var length = 0;
        for (var item in files){
            length++;
        }
        if (length === 0){
            console.log('files no data');
            return;
        }
        //console.log(length);
        for (var item in files){
            // 文件对象
            var file = files[item];
            //console.log(file);

            // 获取临时文件的目录
            var tempfilepath = file.path;
            // 文件拓展名
            var extname = path.extname(file.name);
            // 生成文件名
            var time = dateFormat(new Date(), 'yyyymmddhhMMss'),
                filename = time + '_' + Math.random().toString().slice(2).substr(0, 4) + extname,
                newfilepath = path.join(app.get('tempuploadpath'), filename),
                thumbpath = path.join(app.get('tempuploadpath'), 'thumb_' + filename);

            // 文件改名
            fs.renameSync(tempfilepath, newfilepath);

            // 拼接图片url地址
            var result = 'http://' + req.headers.host + '/temp/' + filename;

            // 生成缩略图
            var imgTypeArr = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.ico'];
            for (var i = 0; i < imgTypeArr.length; i++){
                if (extname == imgTypeArr[i]){ // 说明上传的文件是图片格式
                    gm(newfilepath).resize(200, 200).noProfile().
                        write(thumbpath, function (err){
                            if (err){
                                console.error(err);
                            }
                        });
                    break;
                }
            }

            // 返回结果
            res.json({
                originFileName: file.name,
                fileName: filename,
                filePath: result
            });
        }
    });
});

/*
 * GET /upload/editor
 */
router.post('/editor', function (req, res){
    // creates a new incoming form
    var form = new formidable.IncomingForm();
    // 指定文件上传路径
    form.uploadDir = app.get('articlepath');
    // 不处理空文件
    form.onPart = function (part){
        if (part.filename !== ''){
            form.handlePart(part);
        }
    }
    // 处理 request
    form.parse(req, function (err, fields, files){
        if (err){
            console.error('formidable error');
            return res.send('formidable error');
        }
        // 判断目标文件夹是否存在，false -> create
        if (!fs.existsSync(app.get('articlepath'))){
            fs.mkdirSync(app.get('articlepath'));
        }
        // 计算 files 长度
        var length = 0;
        for (var item in files){
            length++;
        }
        if (length === 0){
            console.log('files no data');
            return;
        }
        for (var item in files){
            // 文件对象
            var file = files[item];
            //console.log(file);
            // 获取临时文件的目录
            var tempfilepath = file.path;
            // 文件拓展名
            var extname = path.extname(file.name);
            // 生成文件名
            var time = dateFormat(new Date(), 'yyyymmddhhMMss'),
                filename = time + '_' + Math.random().toString().slice(2).substr(0, 4) + extname,
                newfilepath = path.join(app.get('articlepath'), filename);
            // 文件改名
            fs.renameSync(tempfilepath, newfilepath);
            // 拼接图片url地址
            var result = 'http://' + req.headers.host + '/images/article/' + filename;
            res.send(result);
        }
    });
});

/*
 * GET /upload/del
 */
router.get('/del', function (req, res){
    var filepath = path.join(app.get('tempuploadpath'), req.query.filename);
    var thumbfilepath = path.join(app.get('tempuploadpath'), 'thumb_' + req.query.filename);

    fs.stat(thumbfilepath, function (err, stats){
        if (err){
            //console.error(err);
            return;
        }
        if (stats.isFile()){
            // 移动图片文件
            fs.remove(thumbfilepath, function (err){
                if (err){
                    console.error(err);
                }
            });
        }
    });
    fs.stat(filepath, function (err, stats){
        if (err){
            //console.error(err);
            return res.json({
                errCode: 0,
                errMsg: '文件不存在'
            });
        }
        if (stats.isFile()){
            // 移动图片文件
            fs.remove(filepath, function (err){
                if (err){
                    console.error(err);
                }
                res.json({
                    errCode: 1,
                    errMsg: '文件删除成功'
                });
            });
        }
    });
});
