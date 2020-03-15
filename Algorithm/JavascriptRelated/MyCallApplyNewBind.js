/* 
    实现 Call
        1. 判断当前this是否为函数，防止Function.prototype.myCall() 直接调用
        2. context 为可选参数，如果不传的话默认上下文为 window
        3. 为context 创建一个 Symbol（保证不会重名）属性，将值设置为需要调用的函数
        4. 处理参数，传入第一个参数后的其余参数
        5. 调用函数后即删除该Symbol属性
*/

Function.prototype.myCall = function(context = window, ...args){
    if(this != Function.prototype){
        return undefined;
    }
    context = context || window;
    const fn = Symbol();
    context[fn] = this; 
    const result = context[fn](...args);
    delete(context[fn]);
    return result;
}

/* 
    实现 apply
    和 call 类似，不过参数是数组    
*/
Function.prototype.myApply = function (context = window, args) {
    if(this != Function.prototype){
        return undefined;
    }
    context = context || window;
    const fn = Symbol();
    context[fn] = this;
    let result;
    if(Array.isArray(args)){
        result = context[fn](...args);
    }else{
        result = context[fn]();
    }
    delete(context[fn]);
    return result;
}

/* 
    new 实现：
        var arr = new Array();
        在调用 new 的过程中会发生以上四件事情：
            1. var obj  = {}; 新生成了一个对象
            2. obj.__proto__ = Array.prototype; 链接到原型
            3. Array.call(obj); 绑定 this
            4. 返回新对象
*/

Function.prototype.myNew = function () {
    let obj = {};
    let Constructor = [].shift.call(arguments); // 把第一个参数（构造函数名）弹出
    obj._proto_ = Constructor.prototype; // 链接原型
    let ret = Constructor.apply(obj, arguments); // 执行构造函数（此时 arguments 里面只有剩余的参数了），并将 this 指向空的 obj 对象
    return typeof ret === 'object' ? ret : obj;// 如果是一个对象，就返回这个对象，如果没有，该返回什么就返回什么。
}

/* 
    Bind 作用:
        1、函数调用，改变this 
        2、返回一个绑定 this 的新函数 
        3、接收多个参数
        4、支持柯里化形式传参 fn(1)(2)
    实现 Bind:
        1.处理参数，返回一个闭包
        2.判断是否为构造函数调用，如果是则使用 new 调用当前函数
        3.如果不是，使用apply，将context和处理好的参数传入
*/

Function.prototype.myBind = function (context,...args1) {
    if (this === Function.prototype) {
        throw new TypeError('Error');
    }
    const _this = this;
    return function F(...args2) {
        // 判断是否用于构造函数
        if (this instanceof F) {
            return new _this(...args1, ...args2);
        }
        return _this.apply(context, args1.concat(args2));
    }
}

const XY = {
  x: 42,
  getX: function() {
    return this.x;
  }
}

const unboundGetX = XY.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

const boundGetX = unboundGetX.myBind(XY);
console.log(boundGetX());
// expected output: 42