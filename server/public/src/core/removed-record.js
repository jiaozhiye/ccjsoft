/**
 * @Author: jzy
 * @Date: 2016/12/16
 * @Last Modified by: jzy
 * @Last Modified time: 2016/12/16
 */
'use strict';

angular.module('myApp.service.removedRecordService', []).
    service('removedRecordService', ['$rootScope', function($rootScope){
        if (!$rootScope.rfRecords){
            $rootScope.rfRecords = [];
        };
        this.addRecord = function(val){
            if (angular.isArray($rootScope.rfRecords)){
                $rootScope.rfRecords.push(val);
            } else {
                $rootScope.rfRecords = [val];
            }
        };
        this.delRecord = function(){
            if (angular.isArray($rootScope.rfRecords)){
                $rootScope.rfRecords.length = 0;
            }
        };
        this.getRecord = function(){
            if (!angular.isArray($rootScope.rfRecords)){
                return '';
            }
            return $rootScope.rfRecords.join(',');
        };
    }]);
