/**
 * @Author: jzy
 * @Date: 2016/12/16
 * @Last Modified by: jzy
 * @Last Modified time: 2016/12/16
 */
'use strict';

angular.module('myApp.service.arcPicSizeService', []).
    service('arcPicSizeService', ['$rootScope', function($rootScope){
        this.change = function(val){
            $rootScope.$broadcast('picSize', val);
        };
    }]);
