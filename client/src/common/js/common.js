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
			window.serverUrl = 'http://123.57.140.115:2080/';
			return 'production';
		} else if (env == 'development'){
			// window.serverUrl = 'http://localhost:8080/';
			window.serverUrl = 'http://127.0.0.1:2080/';
			return 'development';
		} else {
			return enviroment('production');
		}
	})('development');

	// 命名空间配置
	var namespace = function(developer){
		var Obj = {};
		
		// util方法挂载，无依赖工具方法封装
		Obj.util = Obj.util || {};
	
		// component方法挂载，UI 组件封装
		Obj.component = Obj.component || {};

		// service方法挂载，数据层方法封装
		Obj.service = Obj.service || {};

		// module方法挂载，功能模块封装
		Obj.module = Obj.module || {};

		// 开发人员信息
		Obj.developer = developer || {};
		
		return Obj;
	};

	// 设置命名空间
	window.JZY = window.JZY || namespace({
		name: '焦质晔',
		tel: '13844172990',
		email: 'jiaozhiye@163.com',
		qq: '972359485'
	});

	var res = {
		getEnv: function(){
			return enviroment;
		}
	};
	
	if (typeof module == 'object' && module && typeof module.exports == 'object'){
		module.exports = res;
	}
})(window, document);
