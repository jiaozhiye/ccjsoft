/**
 * @Author: jzy
 * @Date: 2016/12/16
 * @Last Modified by: jzy
 * @Last Modified time: 2016/12/16
 */
'use strict';

angular.module('myApp.factory.formVerify', []).
    factory('formVerify', function (){
        var obj = {};

        // 系统标题规则
        obj.regSite = {
            regVal: 'pass',
            regList: [
                {name : 'required' , tips : '网站标题不能为空'},
                {name : 'pass', tips : '√'}
            ]
        };
        // 用户名规则
        obj.regName = {
            regVal: 'pass',
            regList: [
                {name : 'required' , tips : '用户名不能为空'},
                {name : 'minlength' , tips : '用户名不能少于6位'},
                {name : 'pattern' , tips : '用户名必须是字母数字或下划线'},
                {name : 'pass', tips : '√'}
            ]
        };
        // 密码规则
        obj.regPwd = {
            regVal: 'pass',
            regList: [
                {name : 'required' , tips : '密码不能为空'},
                {name : 'minlength' , tips : '密码不能少于6位'},
                {name : 'pattern' , tips : '密码必须是字母数字或下划线'},
                {name : 'pass', tips : '√'}
            ]
        };
        // 确认密码
        obj.regConfirm = {
            regVal: 'pass',
            regList: [
                {name : 'pattern' , tips : '密码不一致'},
                {name : 'pass', tips : '√'}
            ]
        };
        // 邮箱规则
        obj.regEmail = {
            regVal: 'pass',
            regList: [
                {name : 'required' , tips : '邮箱不能为空'},
                {name : 'pattern' , tips : '邮箱格式不正确'},
                {name : 'pass', tips : '√'}
            ]
        };
        // 用户组名称规则
        obj.regGroup = {
            regVal: 'pass',
            regList: [
                {name : 'required' , tips : '用户组名称不能为空'},
                {name : 'pattern' , tips : '用户组名称不能出现特殊字符'},
                {name : 'pass', tips : '√'}
            ]
        };
        // 分类名称规则
        obj.regClassify = {
            regVal: 'pass',
            regList: [
                {name : 'required' , tips : '分类名称不能为空'},
                {name : 'pattern' , tips : '分类名称不能出现特殊字符'},
                {name : 'pass', tips : '√'}
            ]
        };
        // 文章标题规则
        obj.regArticle = {
            regVal: 'pass',
            regList: [
                {name : 'required' , tips : '文章标题不能为空'},
                {name : 'pattern' , tips : '文章标题不能出现特殊字符'},
                {name : 'pass', tips : '√'}
            ]
        };
        // 应用导航规则
        obj.regNav = {
            regVal: 'pass',
            regList: [
                {name : 'required' , tips : '导航名称不能为空'},
                {name : 'pattern' , tips : '导航名称不能出现特殊字符'},
                {name : 'pass', tips : '√'}
            ]
        };
        // 应用导航规则
        obj.regNavMark = {
            regVal: 'pass',
            regList: [
                {name : 'required' , tips : 'mark值不能为空'},
                {name : 'pattern' , tips : 'mark值不能出现特殊字符，只能是字母和下划线的组合'},
                {name : 'pass', tips : '√'}
            ]
        };

        // 校验方法
        obj.change = function(name, err){
            //console.log(err);
            if (angular.equals({}, err)){ // err为空 -> 数据正确
                this[name]['regVal'] = 'pass';
                return;
            }
            for (var attr in err){
                if (err[attr] == true){ // 说明这一项验证没通过
                    this[name]['regVal'] = attr;
                    break;
                }
            }
        };

        return obj;
    });