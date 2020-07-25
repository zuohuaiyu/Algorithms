/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
    if(!root) return 0;
    let queue = [];
    queue.push(root);
    let deep = 1;
    
    while(queue.length != 0) {
        let size = queue.length;
        for(let i = 0; i < size; i++) {
            let cur = queue.shift(); // 注意是shift 。。。害
            if(!cur.left && !cur.right) return deep;
            if(cur.left) queue.push(cur.left);
            if(cur.right) queue.push(cur.right);
        }
        deep++;
    }
    return deep;
};