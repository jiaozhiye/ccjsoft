/**
 * @Author: Jzy
 * @Date: 2016/9/17
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/9/17
 */
(function(window, document, undefined){
	'use strict';

	// 开发/生产环境配置
	var enviroment = (function(env){
		window.console = window.console || {};
		if (env == 'production'){
			window.console.log = window.console.warn = window.console.error = function(){};
			window.serverUrl = 'http://www.xiaoken.org:2080/api';

			// ajax 配置
			$.ajaxSetup({
				xhrFields: {
					withCredentials: false
				},
				cache: false,
				timeout: 4000
			});
			// ajax 错误配置
			$(document).ajaxError(function(event, xhr, settings, thrownError){
				if (xhr.status == 403){
					window.alert('current ajax response status is 403, this site will redirect to login page for reloging in');
				}
			});

			return 'production';
		} else if (env == 'development'){
			window.serverUrl = 'http://127.0.0.1:2080/api';
			return 'development';
		} else {
			return enviroment('production');
		}
	})('development');

	// 命名空间配置
	var space = (function(){
		// 命名空间
		var Obj = Obj || {};

		// 开发人员信息
		Obj.developer = Obj.developer || {
			name: '焦质晔',
			tel: '13844172990',
			email: 'jiaozhiye@163.com',
			qq: '972359485'
		};

		// util方法挂载，无依赖工具方法封装
		Obj.util = Obj.util || {};

		// component方法挂载，UI 组件封装
		Obj.component = Obj.component || {};

		// service方法挂载，数据层方法封装
		Obj.service = Obj.service || {};

		// module方法挂载，功能模块封装
		Obj.module = Obj.module || {};

		return Obj;
	})();

	// 设置命名空间
	window.JZY = window.JZY || space;

	var res = {
		getEnv: function(){
			return enviroment;
		}
	};

	if (typeof module == 'object' && module && typeof module.exports == 'object'){
		module.exports = res;
	} else {
		if (typeof define == 'function' && define.amd){
			define('Common', [], function (){
				return res;
			});
		}
	}
})(window, document);
