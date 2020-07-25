/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

 /* 
    BFS
    记录每层的最右边的节点
 */

var rightSideView = function(root) {
    if(!root) return [];
    let queue = [];
    let ans = [];
    queue.push(root);
    while(queue.length != 0) {
        let size = queue.length;
        for(let i = 0; i < size; i++) { // 这里确定了每层节点的区间
            if(i == size - 1) ans.push(queue[0].val); 
            let node = queue.shift();
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
    }
    return ans;
};

/* 
    DFS
    按照 「根结点 -> 右子树 -> 左子树」 的顺序访问，就可以保证每层都是最先访问最右边的节点的。
*/

var rightSideView  = function (root) {
    let res = [];
    dfs(root, 0, res);
    return res;
}

var dfs = function(root, depth, res) {
    if(!root) return;

    if(res.length === depth) {
        res.push(root.val);
    }
    depth++;
    dfs(root.right, depth, res);
    dfs(root.left, depth, res);
}
