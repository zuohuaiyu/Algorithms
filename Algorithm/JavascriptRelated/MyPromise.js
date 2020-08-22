const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(executor) {
  this.state = PENDING;
  this.value = null;
  this.reason = null;
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  const resolve = (value) => {
    if (this.state === PENDING) {
      this.state = FULFILLED;
      this.value = value;
      this.onFulfilledCallbacks.forEach((fun) => {
        fun();
      });
    }
  };

  const reject = (reason) => {
    if (this.state === PENDING) {
      this.state = REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach((fun) => {
        fun();
      });
    }
  };

  try {
    executor(resolve, reject);
  } catch (reason) {
    reject(reason);
  }
}

/* 
    1. then方法接受两个参数onFulfilled、onRejected，它们分别在状态由PENDING改变为FULFILLED、REJECTED后调用
    2. 一个promise可绑定多个then方法
    3. then方法可以同步调用也可以异步调用
    4. 同步调用：状态已经改变，直接调用onFulfilled方法
    5. 异步调用：状态还是PENDING，将onFulfilled、onRejected分别加入两个函数数组onFulfilledCallbacks、onRejectedCallbacks，当异步调用resolve和reject时，将两个数组中绑定的事件循环执行。
*/

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled != "function") {
    onFulfilled = function (value) {
      return value;
    };
  }
  if (typeof onRejected != "function") {
    onRejected = function (reason) {
      throw reason;
    };
  }

  /* 
  用settimeout来模拟异步调用（并不能实现微任务和宏任务的执行机制，只是保证异步调用）
  */
  const promise2 = new MyPromise((resolve, reject) => {
    switch (this.state) {
      case "FULFILLED":
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            return resolve(x);
          } catch (reason) {
            reject(reason);
          }
        }, 0);
        break;
      case "REJECTED":
        setTimeout(() => {
          try {
            const x = onRejected(this.value);
            resolve(x);
          } catch (reason) {
            reject(reason);
          }
        }, 0);
        break;
      case "PENDING":
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolve(x);
            } catch (reason) {
              reject(reason);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          try {
            setTimeout(() => {
              const x = onRejected(this.reason);
              resolve(x);
            }, 0);
          } catch (reason) {
            reject(reason);
          }
        });
        break;
      default:
        break;
    }
  });
  return promise2;
};

/* 
    catch 方法
    若上面没有定义reject方法，所有的异常会走向catch方法：
*/

MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

/* 
    finally 方法
    不管是resolve还是reject都会调用finally。
*/

MyPromise.prototype.finally = function (fn) {
  return this.then(
    (value) => {
      fn();
      return value;
    },
    (reason) => {
      fn();
      throw reason;
    }
  );
};

/* 
    Promise.resolve() 方法
    Promise.resolve用来生成一个直接处于FULFILLED状态的Promise。
*/
MyPromise.reject = function (value) {
  if (value instanceof MyPromise) return value;
  return new MyPromise((resolve, reject) => {
    resolve(value);
  });
};

/* 
    Promise.reject() 方法
    Promise.reject用来生成一个直接处于REJECTED状态的Promise。
*/
MyPromise.reject() = function (reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason);
  });
};

/* 
    Promise.all() 方法
    接受一个promise数组，当所有promise状态resolve后，执行resolve
    1. 传入参数为一个空的可迭代对象，则直接进行resolve。
    2. 如果参数中有一个promise失败，那么Promise.all返回的promise对象失败。
    3. 在任何情况下，Promise.all 返回的 promise 的完成状态的结果都是一个数组
*/

MyPromise.all = function (promises) {
  return new MyPromise((resolve, reject) => {
    if (promises.length === 0) {
      return resolve([]);
    } else {
      let result = [];
      let index = 0;
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (data) => {
            result[i] = data;
            if (++index === promises.length) {
              resolve(result);
            }
          },
          (reason) => {
            reject(reason);
            return;
          }
        );
      }
    }
  });
};

/* 
    Promise.race()方法
    接受一个promise数组，当有一个promise状态resolve后，执行resolve
*/

MyPromise.race() = function (promises) {
  return new MyPromise((resolve, reject) => {
    if (promises.length === 0) {
      resolve();
    } else {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (data) => {
            resolve(data);
            return;
          },
          (reason) => {
            reject(reason);
            return;
          }
        );
      }
    }
  });
};
