// ---控制最大并发数MaxRun实现---
function MaxRun() {
  this.runList = [];
  this.maxCount = 5;
}
// 添加任务方法
MaxRun.prototype.add = function (args) {
  Array.prototype.push.apply(this.runList, args);
};
// 跑起来
MaxRun.prototype.run = function () {
  if (this.runList.length === 0) return;

  let runList = this.runList;

  // 取任务队列数与最大并发数最小值 作为下面任务任务运行数量
  let min = Math.min(runList.length, this.maxCount);
  
  for (let i = 0; i < min; i++) {
    // 运行一次maxCount--，因为Promise是微任务，当min次之后，此时每一个Promise都还没开始then

    // maxCount为最后剩余的能添加任务的坑位，因为 maxCount 与任务队列长度取最小值
    // 如果maxCount比任务队列长度小 那么maxCount在这一波for循环结束就会为0，此时意味着没有任务可以继续执行
    // 如果maxCount比任务队列长度大 那么maxCount在这一波for循环结束就会是maxCount-队列长度，剩下多少就意味着还有多少坑位可以来任务执行

    this.maxCount--;
    let task = runList.shift();
    // 成功失败该干啥干啥 最后执行完一个要将maxCount++ 将用完的坑位让出来 可以有别的任务进来
    task
      .then(
        (e) => console.log(e),
        (err) => err
      )
      .finally((e) => {
        this.maxCount++;
        console.log("剩余坑位", this.maxCount);
        // 执行run 意味着只要有坑位 队列有数据 就能一直执行队列 如果不执行run （如果任务队列长度是10 maxcount是2，那没执行2次就结束了 后面的任务不会继续执行）
        this.run();
      });
  }
};

// ---下面为测试代码---
function createP(n) {
  let res = [];
  for (let i = 0; i < n; i++) {
    res.push(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(1000 * i);
        }, (1000 * i));
      })
    );
  }
  return res;
}

let maxRun = new MaxRun();
maxRun.add(createP(10));
maxRun.run();

var sendRequest = async function (reqs, max=4) {
  return new Promise(resolve => {
    const len = forms.length;
    let idx = 0;
    let counter = 0;
    const start = async ()=> {
      // 有请求，有通道
      while (idx < len && max > 0) {
        max--; // 占用通道
        console.log(idx, "start");
        let tast = reqs.shift();
        idx++
        task.then(() => {
          max++; // 释放通道
          counter++;
          if (counter === len) {
            resolve();
          } else {
            start();
          }
        });
      }
    }
    start();
  });
}