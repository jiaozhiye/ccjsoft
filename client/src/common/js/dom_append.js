/**
 * @Author: Jzy
 * @Date: 2016/9/17
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/9/17
 */
JZY.util.DomAppend = (function ($, win, undefined) {
    var ObjPrivate = (function () {
        return {
            _setPara: function (options) {
                this.data = options.data || this.data;
                this.templateFunc = options.templateFunc || this.templateFunc;
                this.$$wrapper = options.$$wrapper || this.$$wrapper;
                if (!this.data) {
                    console.log('no valid data detected');
                }
                if (!this.templateFunc) {
                    console.log('no valid templateFunc detected');
                }
                if (!this.$$wrapper) {
                    console.log('no valid $$wrapper detected');
                }
            }
        }
    })();
    var Obj = function (options) {
        if (this instanceof Obj) {
            ObjPrivate._setPara.call(this, options);
        } else {
            return new Obj(options);
        }
    };
    Obj.prototype = {
        constructor: Obj,
        getDom: function () {
            var obj = this,
                html = this.templateFunc(this.data),
                $$html = $(html);
            return {
                html: html,
                $$html: $$html
            }
        },
        appendIntoWrapper: function (reverse) {
            var domObj = this.getDom();
            if (!this._$$html) {
                reverse ? this.$$wrapper.prepend(domObj.$$html) : this.$$wrapper.append(domObj.$$html);
                this._$$html = domObj.$$html;
            } else {
                console.log('already filled into wrapper');
            }
        },
        prependIntoWrapper: function () {
            this.appendIntoWrapper(true);
        },
        update: function (options) {
            ObjPrivate._setPara.call(this, options);
        },
        remove: function () {
            this._$$html && this._$$html.remove();
            for (var i in this) {
                this[i] = null;
            }
        }
    };
    return Obj;
})(jQuery, window);

// 示例：
//var oDomAppend = new JZY.util.DomAppend({
//    data: {title: xxx},
//    templateFunc: doT.template($('#xxx_template').html()),
//    $$wrapper: $('.xxx_wrapper')
//});
//oDomAppend.appendIntoWrapper();
