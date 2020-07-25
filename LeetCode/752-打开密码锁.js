/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function(deadends, target) {
    let minus = function(screts, j) {
        let temp = screts.split(''); // string 是不可变的，所以转成数组来变化 
        if(temp[j] == '0') {
            temp[j] = '9';
        }else{
            temp[j] -= 1;
        }
        temp = temp.join('');
        return temp;
    }
    let plus = function(screts, j) {
        let temp = screts.split('');
        if(temp[j] == '9') {
            temp[j] = '0';
        }else{
            temp[j] = parseInt(temp[j]) + 1; // 不转换成int 会变成字符串拼接操作
        }
        temp = temp.join('');
        return temp;
    }

    let visit = new Set();
    let que = [];
    let res = 0;
    que.push('0000');
    visit.add('0000');
    while(que.length != 0) {
        let size = que.length;
        for(let i = 0; i < size; i++) {
            let cur = que.shift();
            if(deadends.indexOf(cur) != -1) continue;
            if(cur == target) return res;
            for(let j = 0; j < 4; j++) {
                let minusOne = minus(cur, j);
                if(!visit.has(minusOne)) {
                    que.push(minusOne);
                    visit.add(minusOne);
                }
                let plusOne = plus(cur, j);
                if(!visit.has(plusOne)) {
                    que.push(plusOne);
                    visit.add(plusOne);
                }
            }
        }
        res++;
    }
    return -1;
};