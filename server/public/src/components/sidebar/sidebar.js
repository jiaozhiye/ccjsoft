/**
 * @Author: jzy
 * @Date: 2017/7/28
 * @Last Modified by: jzy
 * @Last Modified time: 2017/7/28
 */
JZY.component.SideBar = (function($, window, undefined){
    'use strict';

    //业务逻辑 => Model
    var Logic = (function(){
        var ObjProvite = (function(){
            return {
                _setPara: function(options){
                    this.hammerElement = options.hammerElement || this.hammerElement;
                    this.isDisplay = options.isDisplay || this.isDisplay;
                    this.callback = options.callback || this.callback || null;
                    this.$$navElement = $(this.hammerElement);
                    this.state = 'ready';
                }
            };
        })();
        var Obj = function(options){
            if (this instanceof Obj){
                ObjProvite._setPara.call(this, options);
            } else {
                return new Obj(options);
            }
        };
        Obj.prototype = {
            constructor: Obj,
            create: function(){
                var _this = this;

                // 实例化 Hammer 对象
                this.mc = new Hammer.Manager(this.hammerElement);

                // 默认初始状态
                this.navWrapperWidth = this.$$navElement.outerWidth();
                this.$$maskerElement = this._dom.getDom().$$masker;

                this.transform = {
                    translate: {
                        x: _this.isDisplay ? 0 : -1 * _this.navWrapperWidth,
                        y: 0
                    },
                    scale: 1
                };
                this.opacity = {
                    res: _this.isDisplay ? 1 : 0
                };

                // 设置 Hammer
                this.mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
                this.mc.add(new Hammer.Swipe()).recognizeWith(this.mc.get('pan'));

                // 重设 reqAnimationFrame 方法
                window.reqAnimationFrame = (function(){
                    return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback){
                        window.setTimeout(callback, 1000 / 60);
                    };
                })();
            },
            resetElement: function(){ // 重设元素样式
                var _this = this;
                this.$$navElement.addClass('animate');
                this.$$maskerElement.addClass('animate');

                if (this.isDisplay){ // 打开
                    this.transform.translate.x = 0;
                    this.opacity.res = 1
                } else { // 关闭
                    this.transform.translate.x = -1 * this.navWrapperWidth;
                    this.opacity.res = 0;
                }

                this.reqElementUpdate();

                // 处理回调
                if (this.callback != null){
                    setTimeout(function(){
                        _this.callback.call(_this, _this.isDisplay);
                    }, 350);
                }
            },
            updateElementTransform: function(){ // 更新样式
                var value = [
                    'translate3d(' + this.transform.translate.x + 'px, ' + this.transform.translate.y + 'px, 0)',
                    'scale(' + this.transform.scale + ', ' + this.transform.scale + ')'
                ].join(' ');

                this.$$navElement.css({
                    'webkitTransform': value,
                    'transform': value,
                    'opacity': this.opacity.res
                });
                this.$$maskerElement.css('opacity', this.opacity.res);

                this.state = 'ready';
            },
            reqElementUpdate: function(){
                var _this = this;
                if (this.state == 'ready'){
                    window.reqAnimationFrame(function(){
                        _this.updateElementTransform();
                    });
                    this.state = 'stop';
                }
            },
            navMoveFunc: function(x, y){
                this.$$navElement.removeClass('animate');
                this.$$maskerElement.removeClass('animate');

                this.transform.translate.x = x;
                this.opacity.res = 1 - Math.abs(x) / this.navWrapperWidth;

                this.reqElementUpdate();
            },
            update: function(options){
                ObjProvite._setPara.call(this, options);
            },
            remove: function(){
                for (var attr in this){
                    this[attr] = null;
                }
            }
        };
        return Obj;
    })();

    //DOM操作 => View
    var CreateDom = (function(){
        var ObjProvite = (function(){
            return {
                _setPara: function(options){
                    this.$$outerWrapper = options.$$wrapper || this.$$outerWrapper;
                }
            };
        })();
        var Obj = function(options){
            if (this instanceof Obj){
                ObjProvite._setPara.call(this, options);
            } else {
                return new Obj(options);
            }
        };
        Obj.prototype = {
            constructor: Obj,
            getDom: function(){
                var maskerHtml = '<div class="sidebar-mask animate"></div>';

                if (!this.$$masker) {
                    this.$$masker = $(maskerHtml);
                }

                return {
                    masker: maskerHtml,
                    $$masker: this.$$masker
                };
            },
            fillIntoDom: function(){
                var $$html = this.getDom();
                if (!this._inserted){
                    this.$$outerWrapper.append($$html.$$masker);
                    this._inserted = true;
                } else {

                }
            },
            removeFromDom: function(){
                if (this._inserted){
                    this.$$masker.remove();
                    this._inserted = false;
                } else {

                }
            },
            navPlayDirection: function(dir){
                if (typeof dir == 'undefined'){
                    return false;
                }
                if (dir == 2){ // left
                    this.hideNav();
                }
                if (dir == 4){ // right
                    this.showNav();
                }
                if (dir == 1 || dir == 8 || dir == 16){
                    if (Math.abs(this._logic.transform.translate.x) < this._logic.navWrapperWidth / 2){
                        this.showNav();
                    } else {
                        this.hideNav();
                    }
                }
            },
            showNav: function(){
                var _this = this;
                // 更新状态
                this._logic.isDisplay = true;
                this.fillIntoDom();
                this.$$masker.off('click').on('click', function(ev){
                    ev.stopPropagation();
                    _this.hideNav();
                });
                // 重设样式
                this._logic.resetElement();
            },
            hideNav: function(){
                var _this = this;
                // 更新状态
                this._logic.isDisplay = false;

                setTimeout(function(){
                    _this.removeFromDom();
                }, 350);

                // 重设样式
                this._logic.resetElement();
            },
            getWindowSize: function(){
                var $$win = $(window);
                return {
                    w: $$win.innerWidth(),
                    h: $$win.innerHeight()
                };
            },
            confirmDeviceFunc: function(){
                if (this.getWindowSize().w < 768){
                    return false;
                } else {
                    return true;
                }
            },
            update: function(options){
                ObjProvite._setPara.call(this, options);
            },
            remove: function(){
                for (var attr in this){
                    this[attr] = null;
                }
            }
        };
        return Obj;
    })();

    //事件处理 => Controller
    var EventsBind = (function(){
        var ObjProvite = (function(){
            return {
                _setPara: function(options){
                    this.options = options || this.options;
                    this.$$tapElement = options.$$tapElement || this.$$tapElement;
                    this.$$sideBarBtn = options.$$sideBarBtn || this.$$sideBarBtn;
                    if (!this.$$tapElement){
                        console.log('tapElement is not defined');
                    }
                    if (!this.$$sideBarBtn){
                        console.log('sideBarBtn is not defined');
                    }
                    // 假设默认为大尺寸设备
                    this.isLargDevice = true;
                }
            };
        })();
        var Obj = function(options){
            if (this instanceof Obj){
                ObjProvite._setPara.call(this, options);
            } else {
                return new Obj(options);
            }
        };
        Obj.prototype = {
            constructor: Obj,
            install: function(options){
                if (!this._dom && !this._logic){ // 初次调用组件
                    // 挂载 DOM 操作对象
                    this._dom = new CreateDom({
                        $$wrapper: this.options.$$wrapper
                    });
                    // 挂载 logic 业务逻辑对象
                    this._logic = new Logic({
                        hammerElement: this.$$tapElement.get(0),
                        isDisplay: this.options.isDisplay,
                        callback: this.options.callback
                    });
                    // 互相挂载
                    this._dom._logic = this._logic;
                    this._logic._dom = this._dom;

                    this._logic.create();

                    // 事件监听
                    this.bindInputEvent();
                    this.bindPanEvent();
                    this.bindSwipeEvent();

                    // 导航分类绑定事件
                    this.bindNavClassifyEvent();

                    // 导航按钮绑定事件
                    this.bindNavButtonEvent();

                    // 窗口重置事件
                    this.bindResetEvent();
                } else { // 更新组件
                    this.update(options);
                }
            },
            bindInputEvent: function(){
                var _this = this;
                this._logic.mc.on('hammer.input', function(ev){
                    if (ev.isFinal && !_this.isLargDevice){
                        //console.log(ev.direction);
                        _this._dom.navPlayDirection(ev.direction);
                    }
                });
            },
            bindPanEvent: function(){
                var _this = this;
                this._logic.mc.on('panstart panmove', function(ev){
                    if (_this.isLargDevice){
                        return;
                    }

                    var l = ev.deltaX,
                        t = ev.deltaY;
                    if (ev.deltaX >= 0){
                        l = 0;
                    }
                    if (ev.deltaX < -1 * _this._logic.navWrapperWidth){
                        l = -1 * _this._logic.navWrapperWidth;
                    }
                    _this._logic.navMoveFunc(l, 0);
                });
            },
            bindSwipeEvent: function(){
                this._logic.mc.on('swipe', function(ev){
                    // ...
                });
            },
            bindNavClassifyEvent: function(){
                if (!(this.$$tapElement && this.$$tapElement.length > 0)){
                    return;
                }
                this.$$tapElement.off('click.kg').on('click.kg', 'h5', function(ev){
                    ev.stopPropagation();
                    var $this = $(this);
                    if ($this.hasClass('active')){ // 真，要执行收起
                        $this.removeClass('active').next().slideUp();
                    } else { // 要执行展开
                        $this.addClass('active').next().slideDown();
                    }
                    $this.parent().siblings().find('h5').removeClass('active').next().slideUp();
                });
            },
            bindNavButtonEvent: function(){
                if (!(this.$$sideBarBtn && this.$$sideBarBtn.length > 0)){
                    return;
                }
                var _this = this;
                // 是否动画结束
                var transitionEnd = 'yes';
                this.$$tapElement.off('transitionend').on('transitionend', function(){
                    if (transitionEnd == 'yes' || _this.isLargDevice){
                        return;
                    }
                    transitionEnd = 'yes';
                });

                this.$$sideBarBtn.off('click.kg').on('click.kg', function(ev){
                    ev.stopPropagation();

                    if (transitionEnd != 'yes' || _this.isLargDevice){
                        return;
                    }
                    transitionEnd = 'no';

                    if (!_this._logic.isDisplay){ // 展开侧栏
                        _this._dom.showNav();
                    } else { // 收起
                        _this._dom.hideNav();
                    }
                });
            },
            bindResetEvent: function(){
                var _this = this;
                $(window).off('resize.kg').on('resize.kg', function(){
                    _this.isLargDevice = _this._dom.confirmDeviceFunc();
                    return false;
                });
                this.isLargDevice = this._dom.confirmDeviceFunc();
            },
            update: function(options){
                ObjProvite._setPara.call(this, options);
            },
            remove: function(){
                //
                for (var attr in this){
                    this[attr] = null;
                }
            }
        };
        return Obj;
    })();

    //公开接口
    return EventsBind;
})(jQuery, window);

// SideBar 组件调用示例：
//var oSidebar = new JZY.component.SideBar({
//    $$wrapper: $('body'),
//    $$tapElement: $(el),
//    $$sideBarBtn: $('.navbar-brand'),
//    isDisplay: false,
//    callback: function(v){
//        //console.log(v);
//    }
//});
//oSidebar.install();
