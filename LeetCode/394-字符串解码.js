/* 
    https://leetcode-cn.com/problems/decode-string/
    用栈保存数字和字符，左括号进栈，右括号出栈拼接
*/

function decodeStr(s) {
    let str = '', k = '', stack = [];
    for(let char of s) {
        if(!isNaN(char)) {
            k += char;
        }else if(char === '[') {
            stack.push({"str" : str, "k" : k});
            str = '';
            k = '';
        }else if(char === ']') {
            let code = stack.pop();
            str = code.str + str.repeat(code.k);
        }else {
            str += char;
        }
    }
    return str;
}

console.log(decodeStr("3[a]2[bc]"));