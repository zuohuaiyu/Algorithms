/* 
    实现 Call
        1. 判断当前this是否为函数，防止Function.prototype.myCall() 直接调用
        2. context 为可选参数，如果不传的话默认上下文为 window
        3. 为context 创建一个 Symbol（保证不会重名）属性，将当前函数赋值给这个属性
        4. 处理参数，传入第一个参数后的其余参数
        5. 调用函数后即删除该Symbol属性
*/

Function.prototype.myCall = function(content = window, ...args){
    if(this != Function.prototype){
        return undefined;
    }
    content = content || window;
    const fn = Symbol();
    content[fn] = this;
    const result = content[fn](...args);
    delete(content[fn]);
    return result;
}

/* 
    实现 apply
    和 call 类似，不过参数是数组    
*/
Function.prototype.myApply = function (content = window, args) {
    if(this != Function.prototype){
        return undefined;
    }
    content = content || window;
    const fn = Symbol();
    content[fn] = this;
    const result;
    if(Array.isArray(args)){
        result = content[fn](...args);
    }else{
        result = content[fn]();
    }
    delete(content[fn]);
    return result;
}

/* 
    Bind 作用:
        1、函数调用，改变this 
        2、返回一个绑定 this 的新函数 
        3、接收多个参数
        4、支持柯里化形式传参 fn(1)(2)
    实现 Bind:
        1.处理参数，返回一个闭包
        2.判断是否为构造函数调用，如果是则使用new调用当前函数
        3.如果不是，使用apply，将context和处理好的参数传入
*/
Function.prototype.myBind = function (context,...args1) {
    if (this === Function.prototype) {
        throw new TypeError('Error')
    }
    const _this = this
    return function F(...args2) {
        // 判断是否用于构造函数
        if (this instanceof F) {
            return new _this(...args1, ...args2)
        }
        return _this.apply(context, args1.concat(args2))
    }
}