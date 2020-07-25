/* 
    基于快排，当 pivot 为倒数第k个下标则结束

    基于最大堆排序， k−1 次删除操作后堆顶元素就是我们要找的答案

*/

function quickSort(arr) {
    if (arr.length <= 1) { return arr; }
    const pivotIndex = randomPivot(0, arr.length - 1);
    const pivot = arr.splice(pivotIndex, 1)[0];
    let left = [], right = [];
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] < pivot) left.push(arr[i]);
        else right.push(arr[i]);
    }
    return quickSort(left).concat([pivot], quickSort(right));
}

function randomPivot(start, end) {
    return Math.floor(Math.random()*(end - start + 1) + start);
}

var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(quickSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]

//-----------------------------------------------------------------//

function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function heapSort(arr, k) {
    // Build heap
    let heapSize = arr.length;
    for(let i = Math.floor(heapSize / 2); i >= 0; i--) {
        heapify(arr, i, heapSize);
    }
    
    // heap sort
    let temp = heapSize;
    for( let j = heapSize - 1; j >= temp - k + 1; j--) {
        swap(arr, 0, j);
        heapify(arr, 0, --heapSize);
    }
    return arr[0];
}

function heapify(arr, index, heapSize) {
    let l = index * 2 + 1, r = index * 2 + 2, larger = index;
    if(l < heapSize && arr[l] > arr[larger]) {
        larger = l;
    }
    if(r < heapSize && arr[r] > arr[larger]) {
        larger = r;
    }
    if(larger != index) {
        swap(arr, larger, index);
        heapify(arr, larger, heapSize);
    }
}

var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(heapSort(arr, 3));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]


function max(arr, n = arr.length - 1){
    if(n <= 0) return arr[0];
    else{
        if(arr[n] > max(arr, n-1)){
            return arr[n];
        }else{
            return max(arr, n-1);
        }
    }
}

console.log(max([3,1,2,4,5], 4));