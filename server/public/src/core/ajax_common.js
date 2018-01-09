/**
 * @Author: Jzy
 * @Date: 2016/9/17
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/9/17
 */
JZY.service.Ajax = (function($, window, undefined){
    var xhrObj = null;
    var reqFunc = function(reqUrl, reqType, params, success, fail, always, beforeSend){
        xhrObj = $.ajax({
            url: reqUrl,
            type: reqType,
            data: params,
            dataType: 'json',
            beforeSend: function(){
                beforeSend && beforeSend();
            }
        })
        .done(function(response){
            xhrObj = null;
            success && success(response);
        })
        .fail(function(response){
            xhrObj = null;
            fail && fail(response);
        })
        .always(function(response){
            always && always(response);
        });
    };
    return {
        get: function(reqUrl, params, functions){
            xhrObj && xhrObj.abort();
            var reqType = 'GET';
            reqFunc(reqUrl, reqType, params, functions.success, functions.fail, functions.always, functions.beforeSend);
        },
        post: function(reqUrl, params, functions){
            xhrObj && xhrObj.abort();
            var reqType = 'POST';
            reqFunc(reqUrl, reqType, params, functions.success, functions.fail, functions.always, functions.beforeSend);
        }
    };
})(jQuery, window);
