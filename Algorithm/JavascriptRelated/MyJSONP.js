/* 
    1.将传入的data数据转化为url字符串形式
    2.处理url中的回调函数
    3.创建一个script标签并插入到页面中
    4.挂载回调函数
*/

const MyJSONP = ({ url, params, callback }) => {
  // 1.将传入的data数据转化为url字符串形式
  // {id:1,name:'jack'} => id=1&name=jack
  const generateURL = () => {
    let str = "";
    for (let key in params) {
      str += `${key}=${params[key]}&`;
    }
    str += `callback=${callback}`;
    return `${url}?${str}`;
  };
  return new Promise((resolve, reject) => {
    // 2. 处理url中的回调函数
    // 回调函数名若没指定，则为随机数，去掉小数点
    callback = callback || Math.random().toString().replace(".", "");

    // 3. 创建一个script标签并插入到页面中
    let scriptElem = document.createElement("script");
    scriptElem.src = generateURL();
    document.body.appendChild(scriptElem);

    // 4.挂载回调函数
    window[callback] = (data) => {
      resolve(data);
      // script 执行完了，成为无用元素，需要清除
      document.body.removeChild(scriptElem);
    };
  });
};
