/**
 * @Author: jzy
 * @Date: 2016/12/10
 * @Last Modified by: jzy
 * @Last Modified time: 2016/12/10
 */
import jQuery from 'jquery'

JZY.component.TurnPlay = (function($, win, undefined){
	// 私有方法对象
	var ObjProvite = (function(){
		return {
			_setParams: function(option){ // 设置属性参数
				this.outerWrapper = $('body');
				this.targetNodeList = option.$targetNodeList || this.$targetNodeList;
				this.panelSize = option.panelSize || this.panelSize || {};
				this.callback = option.callback || this.callback || null;
				this.state = 'ready';

				this.init = {};
				this.element = null;
			}
		};
	})();
	
	// 1. 构造函数
	var Obj = function(option){
		if (this instanceof Obj){ // 真  ->  说明在外边是这样调的 new JK()
			ObjProvite._setParams.call(this, option);
		} else { // 说明在外边是这样调的  JK()
			return new Obj(option);
		}
	};
	
	// 2. 原型对象  -> 方法
	Obj.prototype = {
		construtor: Obj, // 修改构造函数的指针
		version: '1.0.0', // 组件的版本
		author: 'JZY', // 作者的名称
		install: function(){ // 组件的入口
			this.bindOpenEvent();
			this.bindCloseEvent();
		},
		bindCloseEvent: function(){
			var _this = this;
			this.outerWrapper.off('click.jzy').on('click.jzy', '.win-mask, .win-wrapper-close', function(ev){
				ev.stopPropagation();
				_this.close();
			});
		},
		bindOpenEvent: function(){
			var _this = this;
			this.targetNodeList.off('click.jzy').on('click.jzy', function(ev){
				ev.stopPropagation();
				_this.startStyle(this);
				_this.endStyle(this);
			});
		},
		endStyle: function(obj){
			var endStyle = {}; //插入节点的最终样式
				endStyle.width = this.panelSize.width || 600;
				endStyle.height = this.panelSize.height || 400;
				endStyle.left = (win.innerWidth - endStyle.width) / 2;
				endStyle.top = (win.innerHeight - endStyle.height) / 2;
				endStyle.opacity = 1;
			
			var _this = this;

			setTimeout(function(){ //应用延迟方法, 防止动画失效
				_this.element.css(endStyle).addClass('win-wrapper-AnieEnd');
			}, 0);

			this.element.on('transitionend', function(ev){
				_this.callback && _this.callback($(obj), $('.win-wrapper-box'));
				$(this).off('transitionend');
			});
		},
		startStyle: function(obj){
			var initStyle = {}; //插入节点的起始样式
				initStyle.width = obj.offsetWidth;
				initStyle.height = obj.offsetHeight;
				initStyle.left = obj.getBoundingClientRect().left;
				initStyle.top = obj.getBoundingClientRect().top;
				initStyle.opacity = 0.2;

			this.init = initStyle;
			
			//点击之后插入dom节点
			var insertHTML = [
				'<div class="win-mask"></div>',
				'<div class="win-wrapper win-wrapper-Ani" id="win-wrapper">',
					'<span class="win-wrapper-close lnr lnr-cross"></span>',
					'<div class="win-wrapper-box"></div>',
				'</div>'
			].join('');

			this.outerWrapper.append(insertHTML).css('overflow', 'hidden');

			this.element = $('#win-wrapper');
			
			this.element.css(initStyle);
		},
		close: function(){
			var _this = this;
			this.element.on('transitionend', function(ev){
				_this.element.prev().remove();
				_this.element.remove();
				_this.outerWrapper.css('overflow', '')
				_this.element = null;
				$(this).off('transitionend');
			});
			this.element.css(this.init).removeClass('win-wrapper-AnieEnd');
		},
		update: function(option){ // 更新组件
			ObjProvite._setParams.call(this, option);
		},
		remove: function(){
			// 移除事件
			
			// 释放内存
			for (var i in this){
				this[i] = null;
			}
		}
	};
	
	// 公开接口(构造函数)
	return Obj;
})(jQuery, window);


// 组件调用示例:
