/* 
    柯里化:
        将函数与其参数的一个子集绑定起来后返回个新函数。
    
        用闭包把参数保存起来，当参数的数量足够执行函数了，就开始执行函数。

    实现:
        判断当前函数传入的参数是否大于或等于 fn 需要参数的数量，如果是，直接执行 fn
        如果传入参数数量不够，返回一个闭包，暂存传入的参数，并重新返回 currying 函数
*/

function simpleURL(protocol, domain, path) {
  return protocol + "://" + domain + "/" + path;
}

function currying(fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args);
  } else {
    return (...args2) => currying(fn, ...args, ...args2);
  }
}

var myURL2 = currying(simpleURL, "https", "github.com");
console.log(myURL2("harry"));
