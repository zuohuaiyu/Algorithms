function shuffle(arr) {
  for (let i = arr.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
  }
  return arr;
}


//  Test
var times = 100000;
var res = {};

for (var i = 0; i < times; i++) {
  var arr = shuffle([1, 2, 3]);

  var key = JSON.stringify(arr);
  res[key] ? res[key]++ : (res[key] = 1);
}

// 为了方便展示，转换成百分比
for (var key in res) {
  res[key] = (res[key] / times) * 100 + "%";
}

console.log(res);
/* 
  '[2,1,3]': '16.719%',
  '[2,3,1]': '16.651%',
  '[1,2,3]': '16.619999999999997%',
  '[3,1,2]': '16.772000000000002%',
  '[1,3,2]': '16.662%',
  '[3,2,1]': '16.576%' 
*/