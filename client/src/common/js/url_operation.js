/**
 * @Author: Jzy
 * @Date: 2016/9/17
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/9/17
 */
JZY.util.urlOperation = (function () {
    var hashOperations = (function () {
        var globalHashChangeEventBinded = false,
            hashChangeCallbacks = [];
        return {
            addHashChangeCallback: function (callback) {
                if (!globalHashChangeEventBinded) {
                    window.onhashchange = function (e) {
                        var i;
                        for (i in hashChangeCallbacks) {
                            hashChangeCallbacks[i] && hashChangeCallbacks[i](JZY.util.urlOperation.getHashParams(), e);
                        }
                    };
                    globalHashChangeEventBinded = false;
                }
                if (callback && hashChangeCallbacks.indexOf(callback) == -1) {
                    hashChangeCallbacks.push(callback);
                } else {
                    console.log(callback + ' has already been binded to hashchangeevent or it is not defined.');
                }
            },
            removeHashChangeCallback: function (callback) {
                var index = hashChangeCallbacks.indexOf(callback);
                if (callback && index != -1) {
                    hashChangeCallbacks.splice(index, 1);
                    if (!hashChangeCallbacks.length) {
                        window.onhashchange = null;
                        globalHashChangeEventBinded = false;
                    }
                } else {
                    console.log(callback + ' was not binded to hashchengeevent or it is not defined.');
                }
            },
            pushHash: function (options) {
                var i = '',
                    hash = decodeURIComponent(location.hash).replace('#', ''),
                    reg = null;
                for (i in options) {
                    if (hash.search(i) != -1) {
                        reg = new RegExp('(' + i + '=' + '.*)&?', 'g');
                        hash = hash.replace(reg, i + '=' + options[i] + '&');
                    } else {
                        hash += '&' + i + '=' + options[i] + '&';
                    }
                }
                location.hash = hash.replace(/(&$|^&)/g, '').replace(/&&/g, '&');
            }
        }
    })();

    var makeUrlParams = (function () {
        var makeParams = function (str, trimStr, joinStr, equalStr) {
                var joinStr = joinStr || '&',
                    equalStr = equalStr || '=',
                    dataObj = {};
                if (str.indexOf(trimStr) != -1) {
                    var i,
                        str = decodeURIComponent(str.substr(1)),
                        strs = str.split(joinStr);
                    for (i = 0; i < strs.length; i++) {
                        dataObj[strs[i].split(equalStr)[0]] = decodeURIComponent(strs[i].split(equalStr)[1]);
                    }
                }
                return dataObj;
            },
            combine = function (paramsArr) {
                var i, j, dataObj = {};
                for (i in paramsArr) {
                    for (j in paramsArr[i]) {
                        dataObj[j] = paramsArr[i][j];
                    }
                }
                return dataObj;
            }
        return {
            make: function (str, trimStr, joinStr, equalStr) {
                return makeParams(str, trimStr, joinStr, equalStr);
            },
            combine: function (paramsArr) {
                return combine(paramsArr);
            }
        }
    })();

    return {
        getSearchParams: function (joinStr, equalStr) {
            return makeUrlParams.make(location.search, '?', joinStr, equalStr);
        },
        getHashParams: function (joinStr, equalStr) {
            return makeUrlParams.make(location.hash, '#', joinStr, equalStr);
        },
        getParams: function (joinStr, equalStr) {
            return makeUrlParams.combine([this.getSearchParams(joinStr, equalStr), this.getHashParams(joinStr, equalStr)]);
        },
        pushHash: function (options) {
            hashOperations.pushHash(options);
        },
        addHashChangeCallback: function (callback) {
            hashOperations.addHashChangeCallback(callback);
        },
        removeHashChangeCallback: function (callback) {
            hashOperations.removeHashChangeCallback(callback);
        },
        getPathParams: function(){
            return window.location.pathname.split('/').reverse()[0];
        }
    };
})();





