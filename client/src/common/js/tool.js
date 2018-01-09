export default (function (t) {
    
    // 将json对象或json对象数组转化为json字符串
    t.toJsonStr = function (obj) {
        if (window.JSON) {
            return JSON.stringify(obj);
        } else {
            return $.evalJSON(obj);
        };
    };

    // 将json字符串转换为json对象或json对象数组
    t.toJsonObj = function (str) {
        if (str && typeof str === 'string') {
            if (window.JSON) {
                return JSON.parse(str);
            } else {
                return $.parseJSON(str);
            };
        };
    };

    t.prefixCss = function ($ele, prefixFeature, value) {
        var prefix = ['-webkit-' + prefixFeature, '-moz-' + prefixFeature, '-ms-' + prefixFeature, '-o-' + prefixFeature, '-khtml-' + prefixFeature, prefixFeature];
        for (var i = 0; i < prefix.length; i++) {
            $ele.css(prefix[i], value);
        };
    };

    t.mixLoad = function (cssUrl, htmlUrl, callback) {
        var str = '<style type="text/css">';
        $.ajax({
                url: cssUrl,
                type: 'GET',
                dataType: 'html'
            })
            .done(function (data) {
                str += data + '</style>';
                $.ajax({
                        url: htmlUrl,
                        type: 'GET',
                        dataType: 'html'
                    })
                    .done(function (data) {
                        str += data;
                        callback ? callback(str) : '';
                    });
            })
            .fail(function (data) {
                alert('加载资源失败！');
            });
    };

    t.isFunction = function (f) {
        if (f) {
            if (typeof f == 'function') {
                return true;
            } else {
                return false;
            };
        } else {
            return false;
        };
    };

    t.isString = function (s) {
        if (s) {
            if (typeof s == 'string') {
                return true;
            } else {
                return false;
            };
        } else {
            return false;
        };
    };

    t.sizeof = function(str, charset){ //判断字符串字节数方法
        var total = 0, charCode; //total , 字节数
        charset = charset ? charset.toLowerCase() : '';
        if (charset == 'utf-8' || charset == 'utf8'){
            for (var i = 0, len = str.length; i < len; i++){
                charCode = str.charCodeAt(i);
                if (charCode <= 0x007f){
                    total += 1;
                } else if (charCode <= 0x07ff){
                    total += 2;
                } else if (charCode <= 0xffff){
                    total += 3;
                } else {
                    total += 4;
                }
            }
        }
        return total;
    };

    t.cutstring = function(str, len) { //按照字节数截取字符串
        var total = 0, charCode, res;
        for (var i = 0, iLen = str.length; i < iLen; i++){
            charCode = str.charCodeAt(i);
            if (charCode <= 0x007f){
                total += 1;
            } else if (charCode <= 0x07ff){
                total += 2;
            } else if (charCode <= 0xffff){
                total += 3;
            } else {
                total += 4;
            }
            
            if (total > len){
                res = str.substring(0, i);
                break;
            } else if (total == len){
                res = str.substring(0, i + 1);
                break;
            }
        }
        if (t.sizeof(str, 'utf-8') > len){
            res += '...';
        } else {
            res = str;
        }
        return res;
    };

    return t;

})(JZY.util);