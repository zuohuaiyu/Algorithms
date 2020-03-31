/* 
    返回多个数组的交集
*/

function intersect(...args) {
  if (args.length === 0) {
    return [];
  }

  if (args.length === 1) {
    return args[0];
  }

  return args.reduce((result, arg) => {
    return result.filter(item => arg.includes(item));
  });
}

console.log(intersect([1], [1, 2], [2, 1, 4]));
