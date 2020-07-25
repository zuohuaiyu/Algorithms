/**
 * @param {string} s
 * @return {number}
 */
/* 
    维护数组
*/
 var lengthOfLongestSubstring = function(s) {
    let maxLen = 0;
    let temp = [];
    for(let i = 0; i < s.length; i++) {
        let index = temp.indexOf(s[i]);
        if(index !== -1)  {
            // while(temp.indexOf(s[i]) !== -1){
            //     temp.shift();
            // }
            temp.splice(0, index + 1);
        }
        temp.push(s[i]);
        maxLen = Math.max(maxLen, temp.length);
    }
    return maxLen;
};


/* 
     维护下标
*/
var lengthOfLongestSubstring = function(s) {
    let maxLen = 0;
    for(let i = 0, j = 0; j < s.length; j++){
        let index = s.slice(i, j).indexOf(s[j]);
        if(index !== -1) {
            i = i + index + 1;
        }
        maxLen = Math.max(maxLen, j - i + 1);
    }
    return maxLen;
};

console.log(lengthOfLongestSubstring("aabaab!bb"));