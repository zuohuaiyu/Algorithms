/* 
    用 Set 特性
*/

const unique_set = (arr) => {
  Array.from(new Set(arr));

  // [...new Set(arr)];
};

/* 
    用 Object 标记
*/

const unique_obj = (arr) => {
  let obj = {};
  return arr.filter(
    (item, index) =>
      obj.hasOwnProperty(item)
        ? false // 有则返回false，过滤掉
        : (obj[item] = true) // 没有则设置为 true
  );
};

const unique_indexOf = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) === index); // 前面出现过相同的元素则过滤掉
};

/* 
    去除重复的值
    只要重复就全部去除
*/

const filterNonUnique = (arr) => {
  arr.filter((item) => arr.indexOf(item) === arr.lastIndexOf(item));
};
