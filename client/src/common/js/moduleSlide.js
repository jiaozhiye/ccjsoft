 // 调用方法：
 //     JZY.component.moduleSlide.init({
 //         $wrapper: $('#J_site .J_module'), 			//滑块容器，可变
 //         $columnUnit: $('#J_site .J_moduleColumn'),	//滑块最小宽度单元，可变
 //         $column: $('#J_site .J_moduleColumn'),		//滑块，可变
 //         $nextTrigger: $('#J_site .J_moduleNext'),	//翻页事件触发元素selector，可变
 //         $prevTrigger: $('#J_site .J_modulePrev'),	//翻页事件触发元素selector，可变
 //         direction: 'horizontal',					//滑动方向，竖向滑动方法待写
 //         timer: 40									//动画速度，数字越小滑块滑动时间间隔越小，可变
 //     });  

 // 默认绑定单个模块多模块调用需要使用循环或each遍历

 import $ from 'jquery';
 JZY.component.moduleSlide = {};

 (function () {
     var m = JZY.component.moduleSlide,
         DOMEvents = {},
         DOMControler = {};

     m.slideAble = true;

     (function () {
         var DOMRender = {},
             DOMOperate = {};

         (function () {
             var c = DOMControler;

             // 横向定位column
             var positionH = function ($selector, distance) {
                 var distance = distance || 0;
                 $selector.each(function () {
                     var $this = $(this),
                         columnWidth = $this.outerWidth(true);
                     DOMRender.positionH($this, distance);
                     distance += columnWidth;
                 });
             };

             // 纵向定位column
             var positionV = function ($selector, distance) {
                 var distance = distance || 0;
                 $selector.each(function () {
                     var $this = $(this),
                         columnHeight = $this.outerHeight(true);
                     DOMRender.positionV($this, distance);
                     distance += columnHeight;
                 });
             };

             // 初始化滑动参数
             var slideParaInit = function ($column) {
                 var $column = $column.filter(':visible');
                 var wrapperWidth = $column.parent().width() + parseInt($column.css('margin-right')),
                     targetLeft = parseInt($column.attr('translateX')) || 0,
                     totalWidth = 0;

                 $column.each(function () {
                     var $this = $(this),
                         thisWidth = $this.outerWidth(true);
                     totalWidth += thisWidth;
                 });
                 return {
                     wrapperWidth: wrapperWidth,
                     totalWidth: totalWidth,
                     targetLeft: targetLeft
                 };
             };


             var slideParaInitV = function ($column) {
                 var wrapperHeight = $column.parent().height() + parseInt($column.css('margin-bottom')),
                     targetTop = parseInt($column.attr('translatey')) || 0,
                     totalHeight = 0;

                 $column.each(function () {
                     var $this = $(this),
                         thisHeight = $this.outerHeight(true);
                     totalHeight += thisHeight;
                 });
                 return {
                     wrapperHeight: wrapperHeight,
                     totalHeight: totalHeight,
                     targetTop: targetTop
                 };
             };

             // 计算下一页滑动距离
             var slideNextParaCalc = function ($column, $nextTrigger, $prevTrigger) {
                 var data = slideParaInit($column),
                     wrapperWidth = data.wrapperWidth,
                     totalWidth = data.totalWidth,
                     targetLeft = data.targetLeft,
                     newLeft = targetLeft - wrapperWidth,
                     minLeft = wrapperWidth - totalWidth;
                 // newLeft < minLeft ? newLeft = minLeft : '';
                 if (newLeft <= minLeft) {
                     newLeft = minLeft;
                     DOMRender.hideButton($nextTrigger);
                 };
                 if (newLeft > 0) {
                     newLeft = 0;
                 };
                 totalWidth > wrapperWidth - parseInt($column.css('margin-right')) ? DOMRender.showButton($prevTrigger) : '';
                 return newLeft;
             };

             var slideNextParaCalcV = function ($column, $nextTrigger, $prevTrigger) {
                 var data = slideParaInitV($column),
                     wrapperHeight = data.wrapperHeight,
                     totalHeight = data.totalHeight,
                     targetTop = data.targetTop,
                     newTop = targetTop - wrapperHeight,
                     minTop = wrapperHeight - totalHeight;


                 // newLeft < minLeft ? newLeft = minLeft : '';
                 if (newTop <= minTop) {
                     newTop = minTop;
                     DOMRender.hideButton($nextTrigger);
                 };
                 if (newTop > 0) {
                     newTop = 0;
                 };
                 totalHeight > wrapperHeight ? DOMRender.showButton($prevTrigger) : '';
                 return newTop;
             };

             // 计算上一页滑动距离
             var slidePrevParaCalc = function ($column, $prevTrigger, $nextTrigger, singleLeft) {

                 var data = slideParaInit($column),
                     wrapperWidth = data.wrapperWidth,
                     totalWidth = data.totalWidth,
                     targetLeft = data.targetLeft,
                     newLeft = singleLeft ? (targetLeft + $column.outerWidth(true)) : (targetLeft + wrapperWidth),
                     maxLeft = 0;

                 // newLeft > maxLeft ? newLeft = maxLeft : '';
                 if (newLeft >= maxLeft) {
                     newLeft = maxLeft;
                     DOMRender.hideButton($prevTrigger);
                     totalWidth > wrapperWidth - parseInt($column.css('margin-right')) ? DOMRender.showButton($nextTrigger) : DOMRender.hideButton($nextTrigger);
                     setTimeout(function () {
                         totalWidth <= wrapperWidth ? DOMRender.hideButton($nextTrigger) : '';
                     }, 200);
                 } else {
                     setTimeout(function () {
                         DOMRender.showButton($prevTrigger);
                         totalWidth > wrapperWidth && newLeft == wrapperWidth - totalWidth ? DOMRender.hideButton($nextTrigger) : DOMRender.showButton($nextTrigger);
                         totalWidth <= wrapperWidth ? DOMRender.hideButton($nextTrigger) : '';
                     }, 50);
                 };
                 return newLeft;

             };

             var slidePrevParaCalcV = function ($column, $prevTrigger, $nextTrigger, singleTop) {

                 var data = slideParaInitV($column),
                     wrapperHeight = data.wrapperHeight,
                     totalHeight = data.totalHeight,
                     targetTop = data.targetTop,
                     newHeight = singleTop ? (targetTop + $column.outerHeight(true)) : (targetTop + wrapperHeight),
                     maxHeight = 0;
                 // console.log(wrapperHeight,totalHeight,targetTop,newHeight);
                 // newHeight > maxHeight ? newHeight = maxHeight : '';
                 if (newHeight >= maxHeight) {
                     newHeight = maxHeight;
                     DOMRender.hideButton($prevTrigger);
                     totalHeight > wrapperHeight ? DOMRender.showButton($nextTrigger) : DOMRender.hideButton($nextTrigger);
                     setTimeout(function () {
                         totalHeight <= wrapperHeight ? DOMRender.hideButton($nextTrigger) : '';
                     }, 200);
                 } else {
                     setTimeout(function () {
                         DOMRender.showButton($prevTrigger);
                         totalHeight > wrapperHeight && newHeight == wrapperHeight - totalHeight ? DOMRender.hideButton($nextTrigger) : DOMRender.showButton($nextTrigger);
                         totalHeight <= wrapperHeight ? DOMRender.hideButton($nextTrigger) : '';
                     }, 50);
                 };
                 return newHeight;

             };


             var slideLoopNext = function (i, $column, newLeft, timer) {
                 i++;
                 slideNext(i, $column, newLeft, timer);
             };

             var slideLoopPrev = function (i, $column, newLeft, timer) {
                 i--;
                 slidePrev(i, $column, newLeft, timer);
             };

             var slideLoopNextV = function (i, $column, newTop, timer) {
                 i++;
                 slideNextV(i, $column, newTop, timer);
             };

             var slideLoopPrevV = function (i, $column, newTop, timer) {
                 i--;
                 slidePrevV(i, $column, newTop, timer);
             };

             // 下一页滑动
             var slideNext = function (i, $column, newLeft, timer) {

                 var i = i || 0,
                     iLength = $column.length;
                 i == iLength ? m.slideAble = true : m.slideAble = false;
                 if (i < iLength) {

                     var $this = $column.filter(':eq(' + i + ')'),
                         maxRange = parseInt($column.parent().width()),
                         minRange = -parseInt($column.parent().width()),
                         thisRange = parseInt($this.css('left')) + newLeft;

                     if (thisRange <= maxRange && thisRange >= minRange) {
                         $this.attr('img-view', 'inSight');
                         // i === iLength - 1 ? DOMOperate.slideDistanceMark($column, newLeft) : '';
                         setTimeout(function () {

                             DOMRender.slideTransform($this, newLeft);
                             slideLoopNext(i, $column, newLeft, timer);
                             DOMOperate.slideDistanceMark($column, newLeft);
                         }, timer);
                     } else {

                         DOMRender.slideTransform($this, newLeft);
                         slideLoopNext(i, $column, newLeft, timer);
                         DOMOperate.slideDistanceMark($column, newLeft);
                         // i === iLength - 1 ? DOMOperate.slideDistanceMark($column, newLeft) : '';
                     };
                 };
             };


             var slideNextV = function (i, $column, newTop, timer) {
                 var i = i || 0,
                     iLength = $column.length;
                 i == iLength ? m.slideAble = true : m.slideAble = false;
                 if (i < iLength) {

                     var $this = $column.filter(':eq(' + i + ')'),
                         maxRange = parseInt($column.parent().height()),
                         minRange = -parseInt($column.parent().height()),
                         thisRange = parseInt($this.css('top')) + newTop;

                     if (thisRange <= maxRange && thisRange >= minRange) {
                         $this.attr('img-view', 'inSight');
                         // i === iLength - 1 ? DOMOperate.slideDistanceMark($column, newTop) : '';
                         setTimeout(function () {

                             DOMRender.slideTransformV($this, newTop);
                             slideLoopNextV(i, $column, newTop, timer);
                             DOMOperate.slideDistanceMarkV($column, newTop);
                         }, timer);
                     } else {

                         DOMRender.slideTransformV($this, newTop);
                         slideLoopNextV(i, $column, newTop, timer);
                         DOMOperate.slideDistanceMarkV($column, newTop);
                         // i === iLength - 1 ? DOMOperate.slideDistanceMark($column, newTop) : '';
                     };
                 };
             };



             // 上一页滑动
             var slidePrev = function (i, $column, newLeft, timer) {

                 var i = i,
                     iLength = 0;
                 // console.log(i,iLength);

                 i == iLength - 1 ? m.slideAble = true : m.slideAble = false;

                 if (i >= iLength) {
                     var $this = $column.filter(':eq(' + i + ')'),
                         maxRange = 2 * parseInt($column.parent().width()),
                         minRange = 0,
                         thisRange = parseInt($this.css('left')) + newLeft;

                     if (thisRange <= maxRange && thisRange >= minRange) {
                         setTimeout(function () {
                             DOMRender.slideTransform($this, newLeft);
                             slideLoopPrev(i, $column, newLeft, timer);
                             DOMOperate.slideDistanceMark($column, newLeft);

                         }, timer);
                     } else {
                         DOMRender.slideTransform($this, newLeft);
                         slideLoopPrev(i, $column, newLeft, timer);
                         DOMOperate.slideDistanceMark($column, newLeft);
                     };

                 };

             };

             var slidePrevV = function (i, $column, newTop, timer) {


                 var i = i,
                     iLength = 0;
                 // console.log(i,iLength);

                 i == iLength - 1 ? m.slideAble = true : m.slideAble = false;

                 if (i >= iLength) {
                     var $this = $column.filter(':eq(' + i + ')'),
                         maxRange = 2 * parseInt($column.parent().height()),
                         minRange = 0,
                         thisRange = parseInt($this.css('top')) + newTop;

                     if (thisRange <= maxRange && thisRange >= minRange) {
                         setTimeout(function () {
                             DOMRender.slideTransformV($this, newTop);
                             slideLoopPrevV(i, $column, newTop, timer);
                             DOMOperate.slideDistanceMarkV($column, newTop);

                         }, timer);
                     } else {
                         DOMRender.slideTransformV($this, newTop);
                         slideLoopPrevV(i, $column, newTop, timer);
                         DOMOperate.slideDistanceMarkV($column, newTop);
                     };

                 };

             };

             // 设定容器宽度满足整块显示column
             c.setWrapperWidth = function ($wrapper, $columnUnit) {

                 var originalWidth = parseFloat($wrapper.attr('originalWidth'));
                 if (!originalWidth) {
                     originalWidth = $wrapper.width() / $(window).width();
                     $wrapper.attr('originalWidth', originalWidth);
                 };

                 var wrapperWidth = originalWidth * $(window).width();
                 console.log('outerWrapper width is :' + wrapperWidth);
                 wrapperWidth <= 910 ? wrapperWidth = 910 : '';
                 wrapperWidth >= 1720 ? wrapperWidth = 1720 : '';
                 var unitWidth = $columnUnit.outerWidth(true),
                     count = Math.floor(wrapperWidth / unitWidth),
                     newWrapperWidth = unitWidth * count - parseInt($columnUnit.css('margin-right'));
                 $wrapper.find('.Y_moduleColumn').each(function (index) {
                     if (index < count) {
                         $(this).attr('img-view', 'inSight');
                     } else {
                         return false;
                     };
                 });
                 // filter(':lt('+count+')').attr('img-view','inSight');	
                 DOMRender.setWrapperWidth($wrapper, newWrapperWidth);
             };



             c.setWrapperHeight = function ($wrapper, $columnUnit) {
                 // console.log($wrapper.css('height'));
                 // var originalHeight = parseFloat($wrapper.attr('originalHeight'));
                 // console.log('originalHeight'+originalHeight);
                 // if (!originalHeight) {
                 // console.log('originalHeight'+$wrapper.css('height'));
                 $(window).height() <= 800 ? originalHeight = 0.6 : originalHeight = 0.68;
                 // console.log(originalHeight);
                 $wrapper.attr('originalHeight', originalHeight);
                 // };

                 var wrapperHeight = originalHeight * $(window).height(),
                     unitHeight = $columnUnit.outerHeight(true),
                     count = Math.floor(wrapperHeight / unitHeight),
                     newWrapperHeight = unitHeight * count - parseInt($columnUnit.css('margin-bottom'));
                 // $wrapper.find('.Y_moduleColumnV').each(function(index){
                 // 	if(index<count){
                 // 		$(this).attr('img-view','inSight');
                 // 	}else{
                 // 		return false;
                 // 	};	
                 // });
                 // filter(':lt('+count+')').attr('img-view','inSight');	
                 DOMRender.setWrapperHeight($wrapper, newWrapperHeight);
             };


             c.position = function ($column, direction) {

                 switch (direction) {
                     case 'horizontal':
                         positionH($column);
                         break;
                     case 'vertical':
                         positionV($column);
                         break;
                 };

             };

             c.slideSinglePrev = function ($column, timer, $nextTrigger, $prevTrigger) {
                 var data = slideParaInit($column),
                     totalWidth = data.totalWidth,
                     wrapperWidth = data.wrapperWidth;
                 if (totalWidth > wrapperWidth) {
                     var newLeft = slidePrevParaCalc($column, $prevTrigger, $nextTrigger, true);
                     slidePrev($column.length - 1, $column, newLeft, timer);
                 } else {
                     c.slidePrev($column, timer, $prevTrigger, $nextTrigger);
                 };
                 c.initButton($column, $nextTrigger, $prevTrigger);

             };

             // 预留接口供跨屏拖拽使用
             c.slideNext = function ($column, timer, $nextTrigger, $prevTrigger) {
                 var newLeft = slideNextParaCalc($column, $nextTrigger, $prevTrigger);
                 slideNext(0, $column, newLeft, timer);
             };

             c.slideNextV = function ($column, timer, $nextTrigger, $prevTrigger) {
                 var newTop = slideNextParaCalcV($column, $nextTrigger, $prevTrigger);
                 // console.log(newTop);
                 slideNextV(0, $column, newTop, timer);
             };

             // 预留接口供跨屏拖拽使用
             c.slidePrev = function ($column, timer, $prevTrigger, $nextTrigger) {
                 var newLeft = slidePrevParaCalc($column, $prevTrigger, $nextTrigger);
                 slidePrev($column.length - 1, $column, newLeft, timer);
             };

             c.slidePrevV = function ($column, timer, $prevTrigger, $nextTrigger) {
                 var newTop = slidePrevParaCalcV($column, $prevTrigger, $nextTrigger);
                 slidePrevV($column.length - 1, $column, newTop, timer);
             };

             c.slideInit = function ($column, $nextTrigger, $prevTrigger) {
                 DOMRender.slideTransform($column, 0);
                 DOMOperate.slideDistanceMark($column, 0);
                 c.initButton($column, $nextTrigger, $prevTrigger);
             };

             c.slideInitV = function ($column, $nextTrigger, $prevTrigger) {
                 DOMRender.slideTransformV($column, 0);
                 DOMOperate.slideDistanceMarkV($column, 0);
                 c.initButton($column, $nextTrigger, $prevTrigger);
             };

             c.initButton = function ($column, $nextTrigger, $prevTrigger) {
                 var data = slideParaInit($column),
                     wrapperWidth = data.wrapperWidth,
                     totalWidth = data.totalWidth;
                 totalWidth < wrapperWidth + parseInt($column.css('margin-right')) ? DOMRender.hideButton($nextTrigger) : DOMRender.showButton($nextTrigger);
                 DOMRender.hideButton($prevTrigger);
                 JZY.util.prefixCss($column, 'transform', 'translateX(0)');
                 $column.attr('translatex', 0);
             };


         })();


         (function () {
             var r = DOMRender;

             r.positionH = function ($this, distance) {
                 $this.css('left', distance);
             };

             r.positionV = function ($this, distance) {
                 $this.css('top', distance);
             };

             r.setWrapperWidth = function ($wrapper, newWrapperWidth) {
                 $wrapper.css('width', newWrapperWidth);
             };

             r.setWrapperHeight = function ($wrapper, newWrapperHeight) {
                 $wrapper.css('height', newWrapperHeight);
             };

             r.slideTransform = function ($column, newLeft) {
                 JZY.util.prefixCss($column, 'transform', 'translateX(' + newLeft + 'px)');
             };

             r.slideTransformV = function ($column, newTop) {
                 JZY.util.prefixCss($column, 'transform', 'translateY(' + newTop + 'px)');
             };

             r.showButton = function ($button) {
                 $button.removeClass('Y_hide');
             };

             r.hideButton = function ($button) {
                 $button.addClass('Y_hide');
             };

         })();


         (function () {
             var o = DOMOperate;
             // 向column添加属性记录滑动距离
             o.slideDistanceMark = function ($this, newLeft) {
                 $this.attr('translateX', newLeft);
             };

             o.slideDistanceMarkV = function ($this, newTop) {
                 $this.attr('translatey', newTop);
             };

         })();


     })();



     (function () {
         var e = DOMEvents,
             resizeEle = [];

         var slideNext = function (event) {
             var direction = event.data.direction;
             if (m.slideAble) {
                 var timer = event.data.timer || 0,
                     // $slideTarget=$(this).siblings('.Y_moduleContent').children('.Y_moduleColumn');
                     $slideTarget = event.data.$column,
                     $nextTrigger = event.data.$nextTrigger,
                     $prevTrigger = event.data.$prevTrigger;
                 direction == 'horizontal' ? DOMControler.slideNext($slideTarget, timer, $nextTrigger, $prevTrigger) : DOMControler.slideNextV($slideTarget, timer, $nextTrigger, $prevTrigger);
             };
         };




         var slidePrev = function (event) {
             var direction = event.data.direction;
             if (m.slideAble) {
                 var timer = event.data.timer || 0,
                     // $slideTarget=$(this).siblings('.Y_moduleContent').children('.Y_moduleColumn');
                     $slideTarget = event.data.$column,
                     $prevTrigger = event.data.$prevTrigger,
                     $nextTrigger = event.data.$nextTrigger;
                 direction == 'horizontal' ? DOMControler.slidePrev($slideTarget, timer, $prevTrigger, $nextTrigger) : DOMControler.slidePrevV($slideTarget, timer, $prevTrigger, $nextTrigger);
             };
         };



         var resize = function (event) {
             var data = event.data,
                 resizeEle = data.resizeEle,
                 delayTimer = data.delayTimer,
                 direction = data.direction;
             if (delayTimer) {
                 clearTimeout(delayTimer);
             };
             delayTimer = setTimeout(function () {
                 for (var i = 0; i < resizeEle.length; i++) {
                     var ele = resizeEle[i],
                         $wrapper = ele.$wrapper,
                         $columnUnit = ele.$columnUnit,
                         $column = ele.$column,
                         $nextTrigger = ele.$nextTrigger,
                         $prevTrigger = ele.$prevTrigger,
                         direction = ele.direction;
                     if ($column.length > 0) {
                         if (direction == 'horizontal') {
                             DOMControler.setWrapperWidth($wrapper, $columnUnit);
                             DOMControler.position($column, direction);
                             DOMControler.slideInit($column, $nextTrigger, $prevTrigger);
                         } else {
                             DOMControler.setWrapperHeight($wrapper, $columnUnit);
                             DOMControler.position($column, direction);
                             DOMControler.slideInitV($column, $nextTrigger, $prevTrigger);
                         };
                     };
                 };
             }, 1000);
         };


         var resizeInit = function ($wrapper, $columnUnit, $column, direction, $nextTrigger, $prevTrigger) {
             resizeEle.push({
                 $wrapper: $wrapper,
                 $columnUnit: $columnUnit,
                 $column: $column,
                 direction: direction,
                 $nextTrigger: $nextTrigger,
                 $prevTrigger: $prevTrigger
             });
             $(window).on('resize', {
                 resizeEle: resizeEle,
                 delayTimer: null
             }, resize);
         };



         var off = function ($nextTrigger, $prevTrigger) {
             // $('body').off('click', nextTrigger, slideNext);
             $nextTrigger.off('click', slideNext);
             // $('body').off('click', prevTrigger, slidePrev);
             $prevTrigger.off('click', slidePrev);
             $(window).off('resize', resize);

         };

         e.init = function (timer, $nextTrigger, $prevTrigger, $wrapper, $columnUnit, $column, direction) {
             off($nextTrigger, $prevTrigger);
             // $('body').on('click', nextTrigger, {
             // 	timer: timer,
             // 	$column: $column
             // }, slideNext);
             $nextTrigger.on('click', {
                 timer: timer,
                 $column: $column,
                 $nextTrigger: $nextTrigger,
                 $prevTrigger: $prevTrigger,
                 direction: direction
             }, slideNext);
             // $('body').on('click', prevTrigger, {
             // 	timer: timer,
             // 	$column: $column
             // }, slidePrev);
             $prevTrigger.on('click', {
                 timer: timer,
                 $column: $column,
                 $prevTrigger: $prevTrigger,
                 $nextTrigger: $nextTrigger,
                 direction: direction
             }, slidePrev);
             resizeInit($wrapper, $columnUnit, $column, direction, $nextTrigger, $prevTrigger);
             // $(window).on('resize',{
             // 	delayTimer: null,
             // 	$wrapper: $wrapper,
             // 	$columnUnit: $columnUnit,
             // 	$column: $column,
             // 	direction: direction
             // }, resize);

         };


     })();



     m.position = function (options) {
         var $column = options.$column,
             direction = options.direction;
         DOMControler.position($column, direction);
     };

     m.setWrapperWidth = function (options) {
         DOMControler.setWrapperWidth(options.$wrapper, options.$columnUnit);
     };

     m.slideSinglePrev = function (options) {
         DOMControler.slideSinglePrev(options.$column, options.timer, options.$nextTrigger, options.$prevTrigger);
     };

     m.slideNext = function (options) {

         m.slideAble ? DOMControler.slideNext(options.$column, options.timer, options.$nextTrigger, options.$prevTrigger) : '';
     };

     m.slidePrev = function (options) {
         m.slideAble ? DOMControler.slidePrev(options.$column, options.timer, options.$nextTrigger, options.$prevTrigger) : '';
     };

     m.dragReinit = function (options) {
         DOMEvents.init(options.timer, options.$nextTrigger, options.$prevTrigger, options.$wrapper, options.$columnUnit, options.$column, options.direction);
     };

     m.init = function (options) {
         var $wrapper = options.$wrapper,
             $columnUnit = options.$columnUnit,
             $column = options.$column,
             $nextTrigger = options.$nextTrigger,
             $prevTrigger = options.$prevTrigger,
             direction = options.direction,
             timer = options.timer,
             stayPosition = options.stayPosition;

         if ($column.length > 0) {
             if (direction == 'horizontal') {
                 DOMControler.setWrapperWidth($wrapper, $columnUnit);
                 DOMControler.position($column, direction);
                 DOMEvents.init(timer, $nextTrigger, $prevTrigger, $wrapper, $columnUnit, $column, direction);
                 DOMControler.initButton($column, $nextTrigger, $prevTrigger);
             } else {
                 DOMControler.setWrapperHeight($wrapper, $columnUnit);
                 DOMControler.position($column, direction);
                 DOMEvents.init(timer, $nextTrigger, $prevTrigger, $wrapper, $columnUnit, $column, direction);
                 DOMControler.initButton($column, $nextTrigger, $prevTrigger);
             };
         };
     };

 })();