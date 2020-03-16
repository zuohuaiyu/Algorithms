/* 
    防抖（debounce）：
      不管事件触发频率多高，一定在事件触发n秒后才执行。
      如果在一个事件触发的 n 秒内又触发了这个事件，就以新的事件的时间为准，n秒后才执行。
      总之，触发完事件 n 秒内不再触发事件，n秒后再执行。

    实现：
        在debounce函数中返回一个闭包，这里用的普通function，里面的setTimeout则用的箭头函数，
        这样做的意义是让this的指向准确，this的真实指向并非debounce的调用者，而是返回闭包的调用者。
        
        对传入闭包的参数进行透传。
    应用：
      窗口大小变化，调整样式
        window.addEventListener('resize', debounce(handleResize, 200));
      搜索框，输入后1000毫秒搜索
        debounce(fetchSelectData, 300);
      表单验证，输入1000毫秒后验证
        debounce(validator, 1000);
    参数：
      @param{ function } event      回调函数
      @param{ number }   wait       时间窗口的间隔
      @param{ bool }     immediate  是否立即调用函数

      @return { function }        返回客户调用函数
*/

/* 
    第一次不会立即执行
*/

function debounce(event, wait) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      event.apply(this, args);
    }, wait);
  };
}

/*
    第一次会立即执行，再等后面事件触发后等待n秒执行
    用一个 immediate 用于标示是否立即执行。
*/

function debounce(event, wait, immediate) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    if (immediate && !timer) {
      event.apply(this, args);
    }
    timer = setTimeout(() => {
      event.apply(this, args);
    }, wait);
  };
}

/* 
    节流（throttle）:
      不管事件触发频率多高，只在单位时间内执行一次。
    实现：
      时间戳（第一次肯定触发，最后一次不会触发）
      定时器（第一次不会触发，最后一次会触发）
      定时器和时间戳的结合版，也相当于节流和防抖的结合版（第一次和最后一次都会触发）
    
    参数：
      @param{ function } event    回调函数
      @param{ number }   wait     时间窗口的间隔

      @return { function }        返回客户调用函数
*/

/* 
    时间戳版
*/
function throttle_timestamp(event, wait) {
  let pre = 0;
  return function(...args) {
    if (Date.now() - pre > wait) {
      pre = Date.now();
      event.apply(this, args);
    }
  };
}

/* 
    定时器版
*/
function throttle_timer(event, wait) {
  let timer = null;
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        event.apply(this, args);
      }, wait);
    }
  };
}

/* 
    结合版
*/
function throttle_com(event, wait) {
  let pre = 0;
  let timer = null;
  return function(...args) {
    if (Date.now() - pre > wait) {
      clearTimeout(timer);
      pre = date.now();
      event.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        event.apply(this, args);
      }, wait);
    }
  };
}
