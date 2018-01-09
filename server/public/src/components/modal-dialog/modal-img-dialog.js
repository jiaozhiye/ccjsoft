/**
 * @Author: jzy
 * @Date: 2017/7/9
 * @Last Modified by: jzy
 * @Last Modified time: 2017/7/9
 */
JZY.component.ModalImgDialog = (function($, win, undefined){
    //私有方法
    var ObjPrivate = (function(){
        return {
            _setPara: function(options){
                this.$$wrapper = $('body');
                this.imgUrl = options.imgUrl || this.imgUrl;
            }
        };
    })();

    //构造函数
    var Obj = function(options){
        if (this instanceof Obj){
            ObjPrivate._setPara.call(this, options);
        } else {
            return new Obj(options);
        }
    };

    //原型对象  => 绑定公开的方法
    Obj.prototype = {
        constructor: Obj,
        init: function(){
            this.fillIntoWrapper();
            this.bindCloseEvent();
        },
        show: function($obj, classname, callback){
            $obj.show();
            callback && callback.call($obj);
            setTimeout(function(){
                $obj.addClass(classname);
            }, 50);
        },
        hide: function($obj, classname, callback){
            $obj.removeClass(classname);
            $obj.on('webkitTransitionEnd', function(){
                callback && callback.call($obj);
            });
        },
        getDom: function(){
            var templateModal = [
                '<div class="modal fade">',
                    '<div class="modal-dialog modal-img-box">',
                        '<img src="'+ this.imgUrl +'">',
                    '</div>',
                '</div>'
            ].join('');
            var templateMask = [
                '<div class="modal-backdrop fade"></div>'
            ].join('');

            // 生成节点对象
            if (!this.$$template){
                this.$$template = $(templateModal);
            }
            if (!this.$$mask){
                this.$$mask = $(templateMask);
            }

            return {
                templateHtml: templateModal,
                maskHtml: templateMask,
                $$templateHtml: this.$$template,
                $$maskHtml: this.$$mask
            };
        },
        fillIntoWrapper: function(){
            if (this.$$wrapper && this.$$wrapper.length){ // 追加dom节点
                var _htmlObj = this.getDom();
                if (!this._$$htmlAppended){ // this._$$htmlAppended -> 假   添加节点
                    var _this = this;

                    this.$$wrapper.append(_htmlObj.$$templateHtml);
                    this.$$wrapper.append(_htmlObj.$$maskHtml);

                    // 处理显示的动画
                    this.show(_htmlObj.$$templateHtml, 'in');
                    this.show(_htmlObj.$$maskHtml, 'in');

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
                // 判断节点是否存在
                var _this = this;

                if (this.$$template.length && this.$$mask.length){
                    this.hide(this.$$template, 'in', function(){
                        this.off('click.kg');
                        this.remove();
                    });
                    this.hide(this.$$mask, 'in', function(){
                        this.remove();
                        setTimeout(function(){
                            _this.remove();
                        }, 20);
                    });
                }

                this._$$htmlAppended = false;
            }
        },
        bindCloseEvent: function(){
            var _this = this;

            var $$modalBox = this.$$template.children('.modal-img-box');
            $$modalBox.css({
                'marginTop': ($(win).innerHeight() - $$modalBox.outerHeight()) / 2
            });

            // 关闭的事件绑定
            this.$$template.off('click.kg').on('click.kg', function(ev){
                ev.stopPropagation();
                //console.log(ev.target);
                if (ev.target.nodeName == 'IMG'){
                    return;
                }
                _this.removeWrapper();
            });
        },
        update: function(options){
            ObjPrivate._setPara.call(this, options);
        },
        remove: function(){
            for (var attr in this){
                this[attr] = null;
            }
        }
    };

    return Obj;
})(jQuery, window);