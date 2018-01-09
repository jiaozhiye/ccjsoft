/**
 * @Author: jzy
 * @Date: 2016/12/11
 * @Last Modified by: jzy
 * @Last Modified time: 2016/12/11
 */
'use strict';

// 定义主模块，注入依赖
angular.module('myApp', [
  'ngRoute',
  'myApp.header.header-directive',
  'myApp.sidebar.sidebar-directive',
  'myApp.sysinfo',
  'myApp.globalconf',
  'myApp.dbcopy',
  'myApp.dbrestore',
  'myApp.user.add',
  'myApp.user.edit',
  'myApp.user.mod',
  'myApp.group.add',
  'myApp.group.edit',
  'myApp.group.mod',
  'myApp.classify.add',
  'myApp.classify.edit',
  'myApp.classify.mod',
  'myApp.article.add',
  'myApp.article.edit',
  'myApp.article.mod',
  'myApp.appnav.add',
  'myApp.appnav.edit',
  'myApp.appnav.mod'
]);
