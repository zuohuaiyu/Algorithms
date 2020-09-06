function quickSort(arr) {
  if (arr.length <= 1) return arr;

  let index = Math.random() * arr.length;
  let pivot = arr.splice(index, 1)[0];
  let left = [];
  let right = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
}

let arr = [2, 3, 1, 4, 5];
console.log(quickSort(arr));
