function ShallowCopy(obj) {
  if (typeof obj !== "object") return;
  let newObj = obj instanceof Array ? [] : {};
  for(let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  };
  return newObj;
}
function DeepCopy(obj) {
  if (typeof obj !== "object") return;
  let newObj = obj instanceof Array ? [] : {};
  for(let key in obj){
    // 避免拷贝继承下来的属性
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === "object" ? DeepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
}

let obj = {
  a: [1, 2, 3],
  b: {
    c: 2,
    d: 3
  }
}
let newObj = DeepCopy(obj)
newObj.b.c = 1
console.log(obj.b.c) // 2