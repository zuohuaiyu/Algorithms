function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;  
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

function heapSort(arr) {
    // Build heap
    let heapSize = arr.length;
    for(let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
        heapify(arr, i, heapSize);
    }
    
    // heap sort
    for( let j = heapSize - 1; j >= 1; j--) {
        swap(arr, 0, j);
        heapify(arr, 0, --heapSize);
    }
    return arr;
}

var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(heapSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]