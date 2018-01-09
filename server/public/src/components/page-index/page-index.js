/**
 * @Author: Jzy
 * @Date: 2016/9/17
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/9/17
 * 依赖jQuery
 */
JZY.component.PageIndex = (function ($, window, undefined){
    'use strict';

    //业务逻辑类
    var IndexesCalc = (function (){
        var ObjPrivate = (function (){
            return {
                _setPara: function (options){
                    this.showIndex = options.showIndex || this.showIndex || 1;
                    this.maxIndex = options.maxIndex || this.maxIndex || Infinity;
                    this.maxShowLength = options.maxShowLength || this.maxShowLength || 7;
                    this.maxShowLength < 7 ? this.maxShowLength = 7 : '';
                }
            };
        })();
        var Obj = function (options){
            if (this instanceof Obj){
                ObjPrivate._setPara.call(this, options);
            } else {
                return new Obj(options);
            }
        };
        Obj.prototype = {
            constructor: Obj,
            getIndexes: function (options){ //返回分页列表的LI节点数组
                var obj = this,
                    i = options && options.showIndex ? options.showIndex : this.showIndex,
                    min = 0,
                    max = 0,
                    minShowLength = 0,
                    maxShowLength = 0,
                    indexes = [];
                if (this.maxIndex > 0){
                    i > this.maxIndex ? i = this.maxIndex : '';
                    i < 1 ? i = 1 : '';
                    this.showIndex = i;

                    if (i < this.maxShowLength - 2){
                        minShowLength = i - 1;
                        maxShowLength = this.maxShowLength - 3 - minShowLength;
                    } else if (i > this.maxIndex - this.maxShowLength + 3){
                        maxShowLength = this.maxIndex - i + 1;
                        minShowLength = this.maxShowLength - 2 - maxShowLength;
                    } else {
                        minShowLength = Math.floor((this.maxShowLength - 5) / 2);
                        maxShowLength = this.maxShowLength - 5 - minShowLength;
                    }

                    min = i - minShowLength;
                    max = i + maxShowLength;

                    min < 1 ? min = 1 : '';
                    max > this.maxIndex ? max = this.maxIndex : '';

                    while (min < i){
                        if (min == obj.showIndex){
                            indexes.push({
                                index: min,
                                indexAble: true,
                                isShowIndex: true
                            })
                        } else {
                            indexes.push({
                                index: min,
                                indexAble: true
                            })
                        }
                        min++;
                    }
                    while (i <= max){
                        if (i == obj.showIndex){
                            indexes.push({
                                index: i,
                                indexAble: true,
                                isShowIndex: true
                            });
                        } else {
                            indexes.push({
                                index: i,
                                indexAble: true
                            });
                        }
                        i++;
                    }

                    if (indexes[0].index >= 2){
                        indexes.unshift({
                            indexAble: false
                        });
                        indexes.unshift({
                            index: 1,
                            indexAble: true
                        });
                    }
                    if (indexes[indexes.length - 1].index <= this.maxIndex - 2){
                        indexes.push({
                            indexAble: false
                        });
                        indexes.push({
                            index: obj.maxIndex,
                            indexAble: true
                        });
                    }

                    this._indexes = indexes;
                    return {
                        indexes: indexes,
                        showIndex: obj.showIndex,
                        noPrevIndex: (obj.showIndex == 1 ? true : false),
                        noBackIndex: (obj.showIndex == obj.maxIndex ? true : false)
                    };
                } else {
                    return {
                        indexes: [],
                        noPrevIndex: true,
                        noBackIndex: true
                    };
                }
            },
            getNextIndexes: function (){
                return this.getIndexes.call(this, {
                    showIndex: this.showIndex + 1
                });
            },
            getPrevIndexes: function (){
                return this.getIndexes.call(this, {
                    showIndex: this.showIndex - 1
                });
            },
            update: function (options){
                ObjPrivate._setPara.call(this, options);
            },
            remove: function (){
                var i;
                for (i in this){
                    this[i] = null;
                }
            }
        };
        return Obj;
    })();

    //DOM操作类
    var DomCreate = (function (){
        var ObjPrivate = (function (){
            var templateFunc = function (data){
                var prevHtml = data.noPrevPage ? '<button>上一页</button>' : '<button class="JZY_page_prev"><上一页</button>';
                var backHtml = data.noBackPage ? '<button>下一页</button>' : '<button class="JZY_page_next">下一页></button>';

                var pageList = [];
                for (var i = 0; i < data.pages.length; i++){
                    if (data.pages[i].indexAble){
                        if (data.pages[i].isShowIndex){
                            pageList.push('<li class="JZY_current_index YYL_index" data-page="' + data.pages[i].index + '">' + data.pages[i].index + '</li>');
                        } else {
                            pageList.push('<li class="JZY_index" data-page="' + data.pages[i].index + '">' + data.pages[i].index + '</li>');
                        }
                    } else {
                        pageList.push('<li>...</li>');
                    }
                }

                var htmlArr = [
                    '<div class="JZY_page_index">',
                    prevHtml,
                    '<ul class="JZY_page_number">',
                    pageList.join(''),
                    '</ul>',
                    backHtml,
                    '<span class="JZY_total_page">共' + data.totalPage + '页</span>',
                    '<span>到第<input class="JZY_page_input" type="text" placeholder="" />页</span>',
                    '<button class="JZY_page_jump">确定</button>',
                    '</div>'
                ];

                return htmlArr.join('');
            };
            return {
                _setPara: function (options){
                    var obj = this;
                    this.$$wrapper = options.$$wrapper || this.$$wrapper;

                    if (!this.indexesCalc){
                        this.indexesCalc = new IndexesCalc({
                            maxIndex: options.totalPage,
                            showIndex: options.currentPage,
                            maxShowLength: options.maxShowLength
                        });
                    } else {
                        this.indexesCalc.update({
                            maxIndex: options.totalPage,
                            showIndex: options.currentPage,
                            maxShowLength: options.maxShowLength
                        });
                    }
                },
                _templateFunc: templateFunc
            };
        })();
        var Obj = function (options){
            if (this instanceof Obj){
                ObjPrivate._setPara.call(this, options);
            } else {
                return new Obj(options);
            }
        };
        Obj.prototype = {
            constructor: Obj,
            getDom: function (options){
                var obj = this,
                    indexes = options && options.indexes ? options.indexes : this.indexesCalc.getIndexes({
                        showIndex: options && options.pageIndex ? options.pageIndex : ''
                    });

                var html = ObjPrivate._templateFunc.call(this, {
                        pages: indexes.indexes,
                        totalPage: obj.indexesCalc.maxIndex,
                        noPrevPage: indexes.noPrevIndex,
                        noBackPage: indexes.noBackIndex
                    }),
                    $$html = $(html);
                //console.log(html);

                this.html = html;
                if (!this._$$html){
                    this._$$html = $$html;
                }

                return {
                    html: html,
                    $$html: $$html,
                    showIndex: indexes.showIndex || (options ? options.pageIndex : null) || 1,
                    noPrevIndex: indexes.noPrevIndex,
                    noBackIndex: indexes.noBackIndex
                };
            },
            getNextDom: function (){
                var obj = this;
                return this.getDom.call(this, {
                    indexes: obj.indexesCalc.getNextIndexes()
                });
            },
            getPrevDom: function (){
                var obj = this;
                return this.getDom.call(this, {
                    indexes: obj.indexesCalc.getPervIndexes()
                });
            },
            fillIntoWrapper: function (options){
                if (this.$$wrapper && this.$$wrapper.length){
                    var indexesDom = this.getDom(options);
                    if (!this._$$htmlAppended){
                        this.$$wrapper.append(indexesDom.$$html);
                        this._$$htmlAppended = true;
                    } else {
                        this._$$html.html(this.html);
                    }
                    return {
                        showIndex: indexesDom.showIndex,
                        noPrevIndex: indexesDom.noPrevIndex,
                        noNextIndex: indexesDom.noBackIndex
                    }
                } else {
                    console.log('no $wrapper detected');
                }
            },
            fillPrevIntoWrapper: function (){
                var obj = this;
                return this.fillIntoWrapper.call(this, {
                    indexes: obj.indexesCalc.getPrevIndexes()
                });
            },
            fillNextIntoWrapper: function (){
                var obj = this;
                return this.fillIntoWrapper.call(this, {
                    indexes: obj.indexesCalc.getNextIndexes()
                });
            },
            update: function (options){
                ObjPrivate._setPara.call(this, options);
            },
            remove: function (){
                var i;
                this._$$html && this._$$html.remove();
                this.indexesCalc && this.indexesCalc.remove();
                for (i in this){
                    this[i] = null;
                }
            }
        };
        return Obj;
    })();

    //事件处理类
    var EventsBind = (function (){
        var ObjPrivate = (function (){
            return {
                _setPara: function (options){
                    this.options = options || this.options;
                }
            };
        })();
        var Obj = function (options){
            if (this instanceof Obj){
                ObjPrivate._setPara.call(this, options);
            } else {
                return new Obj(options);
            }
        };
        Obj.prototype = {
            constructor: Obj,
            init: function (){
                var obj = this,
                    para,
                    callback = this.options.selectIndexCallback;
                if (!this._dom){
                    this._dom = new DomCreate({
                        totalPage: obj.options.totalPage,
                        currentPage: obj.options.currentPage,
                        maxShowLength: obj.options.maxShowLength,
                        $$wrapper: obj.options.$$wrapper
                    });

                    this._dom.fillIntoWrapper();

                    this._dom._$$html.on('click.bind', '.JZY_index,.JZY_page_prev,.JZY_page_next,.JZY_page_jump', function (ev){
                        ev.stopPropagation();
                        var $this = $(this);

                        if ($this.hasClass('JZY_index')){
                            para = obj._dom.fillIntoWrapper({
                                pageIndex: parseInt($this.attr('data-page'))
                            });
                        } else if ($this.hasClass('JZY_page_prev')){
                            para = obj._dom.fillPrevIntoWrapper();
                        } else if ($this.hasClass('JZY_page_next')){
                            para = obj._dom.fillNextIntoWrapper();
                        } else if ($this.hasClass('JZY_page_jump')){
                            para = obj._dom.fillIntoWrapper({
                                pageIndex: (parseInt(obj._dom._$$html.find('.JZY_page_input').val()) || 1)
                            });
                        }

                        callback && callback(para.showIndex, para.noPrevIndex, para.noNextIndex);
                    });
                } else {
                    this._dom.fillIntoWrapper();
                }
            },
            resetPageIndex: function (){
                this._dom.fillIntoWrapper({
                    pageIndex: 1
                });
            },
            update: function (options){
                ObjPrivate._setPara.call(this, options);
            },
            remove: function (){
                this._dom._$$html.off('click.bind');
                this._dom.remove();
                var i;
                for (i in this){
                    this[i] = null;
                }
            }
        };

        return Obj;
    })();

    return EventsBind;
})(jQuery, window);


// var testPageIndex = new JZY.component.PageIndex({
// 	totalPage: 15,
// 	currentPage: 1,
// 	maxShowLength: 7,
// 	$$wrapper: $('body'),
// 	selectIndexCallback: function(index, noPrevIndex, noBackIndex){
// 		alert(index);
// 	}
// });

// testPageIndex.init();