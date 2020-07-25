/**
 * @param {number} n
 * @return {number}
 */


/* 
    不同的搜索树和 等于 以每个节点为根，左子树节点数递增形成的搜索树个数 乘以 右子树节点数递减形成的搜索树个数，求和
    G(2) = G(0) * G(1) + G(1) * G(0);
    G(3) = G(0) * G(2) + G(1) * G(1) + G(2) * G(0);
*/
var numTrees = function(n) {
    let dp = new Array(n + 1).fill(0);
    dp[0] = 1; dp[1] = 1;
    for(let i = 2; i <= n; i++) {
        for(let j = 1; j <= i; j++) {
            dp[i] += dp[j - 1] * dp[i - j];
        }
    }
    return dp[n];
};


/* 
    卡特兰数： C(n+1) = (4n + 2) * C(n) / （n + 2)
*/
var numTrees = function(n) {
    let C = 1;
    for(let i = 0; i < n; i++) {
        C = (4 * i + 2) * C / (i + 2);
    }
    return C;
};