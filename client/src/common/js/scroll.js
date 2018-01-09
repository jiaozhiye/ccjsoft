/**
 * @Author: jzy
 * @Date: 2016/12/10
 * @Last Modified by: jzy
 * @Last Modified time: 2016/12/10
 */
import jQuery from 'jquery'
import Velocity from 'common/js/velocity.min.js'

JZY.component.Scroll = (function($, win, undefined){
	// 私有方法对象
	var ObjProvite = (function(){
		return {
			_setParams: function(option){ // 设置属性参数
				this.$scrollWrapper = option.$scrollWrapper || this.$scrollWrapper;
				this.$arrowArray = option.$arrowArray || this.$arrowArray || [];
				this.autoPlay = option.autoPlay || this.autoPlay || false;
				this.callback = option.callback || this.callback || null;
				
				// 状态变量属性
				this.state = 'ready'; // 默认准备好了
				this.timer = null;
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
			// 1. 重新设置一下重要的css样式
			this.setScrollStyle();

			// 判断是否需要执行滚动
			if (this.$scrollWrapper.find('li').length <= 1){
				return;
			}
			
			// 每次点击运动的距离
			// this.$scrollWrapper.find('li')[1]  ->  原生js对象
			this.iMoveLen = this.$scrollWrapper.find('li')[1].offsetTop;
			// console.log(this.iMoveLen);
			
			// 2. 对箭头的事件绑定
			this.bindArrowEvent();

			// 3. 给滚动容器绑定事件
			this.bindWrapperEvent();

			// 播放
			this.play();
		},
		setScrollStyle: function(){
			this.$scrollWrapper.css({
				'overflow': 'hidden',
				'position': 'relative'
			}).children('ul').css({
				'position': 'absolute',
				'left': 0,
				'top': 0
			});
		},
		bindArrowEvent: function(){
			if (this.$arrowArray.length == 0){
				return;
			}
			var _this = this;
			this.$arrowArray[0].off('click.kg').on('click.kg', function(ev){
				ev.stopPropagation();
				// 往右走
				_this.moveRight();
			});
			this.$arrowArray[1].off('click.kg').on('click.kg', function(ev){
				// 阻止事件向上冒泡
				ev.stopPropagation();
				// 往左走
				_this.moveLeft();
			});
		},
		moveRight: function(){
			if (this.state != 'ready'){ // 说明没有准备好
				return;
			}
			var _this = this;
			this.state = 'stop';
			// 节点的移动
			this.$scrollWrapper.children('ul')
			.prepend(this.$scrollWrapper.find('li').last());
			// 重置 left 值
			this.$scrollWrapper.children('ul').css('top', -1 * this.iMoveLen);
			// this.$scrollWrapper.children('ul').animate({
			// 	top: 0
			// }, 400, function(){
			// 	_this.callback && _this.callback.call(_this);
			// 	_this.state = 'ready';
			// });
			Velocity(this.$scrollWrapper.children('ul'), {
				top: 0
			}, {
				easing: [ .15,1.1,.76,1.16 ],
				duration: 600,
				complete: function(){
					// 回调
					_this.callback && _this.callback.call(_this);
					_this.state = 'ready';
				}
			});
		},
		moveLeft: function(){
			if (this.state != 'ready'){ // 说明没有准备好
				return;
			}
			var _this = this;
			this.state = 'stop';
			// this.$scrollWrapper.children('ul').animate({
			// 	top: -1 * this.iMoveLen
			// }, 400, function(){
			// 	// 处理节点
			// 	// console.log(this);
			// 	$(this).append($(this).find('li').eq(0));
			// 	// 重置left值
			// 	$(this).css('top', 0);
			// 	// 回调
			// 	_this.callback && _this.callback.call(_this);
			// 	// 
			// 	_this.state = 'ready';
			// });
			Velocity(this.$scrollWrapper.children('ul'), {
				top: -1 * this.iMoveLen
			}, {
				easing: [ .15,1.1,.76,1.16 ],
				duration: 600,
				complete: function(){
					// console.log(this);
					var $this = $(this[0]);
					$this.append($this.find('li').eq(0));
					// 重置left值
					$this.css('top', 0);
					// 回调
					_this.callback && _this.callback.call(_this);
					// 
					_this.state = 'ready';
				}
			});
		},
		bindWrapperEvent: function(){
			var _this = this;
			this.$scrollWrapper.off('mouseenter.kg').on('mouseenter.kg', function(){
				_this.stop();
			});
			this.$scrollWrapper.off('mouseleave.kg').on('mouseleave.kg', function(){
				_this.play();
			});
		},
		play: function(){
			if (!this.autoPlay){
				return;
			}
			var _this = this;
			this.stop();
			this.timer = setInterval(function(){
				_this.moveLeft();
			}, 3000);
		},
		stop: function(){
			this.timer && clearInterval(this.timer);
		},
		update: function(option){ // 更新组件
			ObjProvite._setParams.call(this, option);
		},
		remove: function(){
			// 移除事件
			if (this.$arrowArray.length > 0){
				this.$arrowArray[0].off('click.kg');
				this.$arrowArray[1].off('click.kg');
				this.$arrowArray[0].remove();
				this.$arrowArray[1].remove();
			}
			this.$scrollWrapper.off('mouseenter.kg');
			this.$scrollWrapper.off('mouseleave.kg');
			
			// 移除DOM节点
			this.$scrollWrapper.remove();
			
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
//var oScroll = new JZY.component.Scroll({
//	$scrollWrapper: $('.scroll_main'),
//	$arrowArray: [$('.btn_left'), $('.btn_right')], // 可选
//	callback: function(){ // 可选
//		
//	}
//});
//oScroll.install();