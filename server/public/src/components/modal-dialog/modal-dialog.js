/**
 * @Author: Jzy
 * @Date: 2016/12/13
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/12/13
 */
JZY.component.ModalDialog = (function($, window, undefined){
    //业务逻辑 => Model
    var Logic = (function(){
        var ObjProvite = (function(){
            return {
                _setPara: function(options){

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
            show: function($obj, classname){
                $obj.show();
                setTimeout(function(){
                    $obj.addClass(classname);
                }, 50);
            },
            hide: function($obj, classname, callback){
                $obj.removeClass(classname);
                $obj.on('webkitTransitionEnd', function(){
                    callback && callback();
                });
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
                    this.$$wrapper = options.$$wrapper || this.$$wrapper;
                    this.title = options.title || this.title;
                    this.msg = options.msg || this.msg;
                    this.mask = options.mask || this.mask;
                    this.btns = options.btnArr || this.btns;

                    // 实例化逻辑对象
                    if (!this._logic){
                        this._logic = new Logic();
                    } else {
                        this._logic.update();
                    }
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
                var obj = this;

                // 按钮的模版
                var btnHtml = '';
                for (var i = 0; i < this.btns.length; i++){
                    btnHtml += '<button type="button" class="btn '+ this.btns[i].className +'">'+ this.btns[i].name +'</button>';
                }

                // 模态框整体模版
                var template = [
                    '<div class="modal fade">',
                        '<div class="modal-dialog">',
                            '<div class="modal-content">',
                                '<div class="modal-header">',
                                    '<button type="button" class="close">&times;</button>',
                                    '<h4 class="modal-title">'+ this.title +'</h4>',
                                '</div>',
                                '<div class="modal-body">'+ this.msg +'</div>',
                                '<div class="modal-footer">'+ btnHtml +'</div>',
                            '</div>',
                        '</div>',
                    '</div>'
                ].join('');

                // 遮罩层模版
                var mask = this.mask;

                // 生成节点对象
                if (!this.$$template){
                    this.$$template = $(template);
                }
                if (!this.$$mask){
                    this.$$mask = $(mask);
                }

                return {
                    templateHtml: template,
                    maskHtml: mask,
                    $$templateHtml: this.$$template,
                    $$maskHtml: this.$$mask
                };
            },
            fillIntoWrapper: function(){
                if (this.$$wrapper && this.$$wrapper.length){ // 追加dom节点
                    var _htmlObj = this.getDom();
                    if (!this._$$htmlAppended){ // this._$$htmlAppended -> 假   添加节点
                        this.$$wrapper.append(_htmlObj.$$templateHtml);
                        this.$$wrapper.append(_htmlObj.$$maskHtml);

                        // 处理显示的动画
                        this._logic.show(_htmlObj.$$templateHtml, 'in');
                        this._logic.show(_htmlObj.$$maskHtml, 'in');

                        this._$$htmlAppended = true;
                    } else {
                        // ...
                    }
                } else {
                    console.log('no $wrapper detected');
                }
            },
            removeWrapper: function(){
                if (this._$$htmlAppended){ // this._$$htmlAppended -> 真   移除节点
                    var obj = this;

                    // 判断节点是否存在
                    if (this.$$template && this.$$template.length){
                        this._logic.hide(this.$$template, 'in', function(){
                            obj.$$template.remove();
                        });
                        this._logic.hide(this.$$mask, 'in', function(){
                            obj.$$mask.remove();
                        });
                    }

                    this._$$htmlAppended = false;
                }
            },
            update: function(options){
                ObjProvite._setPara.call(this, options);
            },
            remove: function(){
                this._logic.remove();
                // 移除节点
                this.$$template.remove();
                this.$$mask.remove();
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
                    this.params = options || this.params;
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
            init: function(options){
                var obj = this;
                // 判断DOM节点是否存在
                if (!this._dom){ // 创建节点
                    // 实例化 DOM 操作对象
                    this._dom = new CreateDom({
                        $$wrapper: $('body'),
                        title: this.params.title || '提示信息',
                        msg: this.params.msg || '...',
                        mask: this.params.masker || '',
                        btnArr: this.params.btnArr || []
                    });
                    // 执行添加DOM节点
                    this._dom.fillIntoWrapper();

                    // 绑定事件
                    this._dom.$$template.on('click.bind', '.close, .btn', function(ev){
                        ev.stopPropagation();
                        var $this = $(this);

                        if ($this.hasClass('close')){ // 右上角关闭按钮 或 遮罩层
                            obj._dom.removeWrapper();
                        } else if ($this.hasClass('btn')){ // 按钮事件
                            var v = $this.index();
                            //console.log(v);
                            var fn = obj.params.btnArr[v].callback;
                            fn && fn.call(obj);
                            // 执行关闭
                            obj._dom.removeWrapper();
                        }
                    });
                } else {
                    this._dom.update(options);
                }
            },
            update: function(options){
                ObjProvite._setPara.call(this, options);
            },
            remove: function(){
                // 解绑事件
                this._dom.$$template.off('click.bind');
                this._dom.remove();
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
