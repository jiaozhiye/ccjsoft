/**
 * @Author: Jzy
 * @Date: 2016/9/17
 * @Last Modified by: Jzy
 * @Last Modified time: 2016/9/17
 */
JZY.util.extendPrototype = function (SubType, SuperType){
    var Obj = function (){};
    Obj.prototype = SuperType.prototype;
    SubType.prototype = new Obj();
    SubType.prototype.constructor = SubType;
};