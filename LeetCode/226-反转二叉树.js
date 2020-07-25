/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */

/* 
    递归
*/
const invertTree = function(root) {
    if(!root) return null;
    let right = root.right;
    root.right = root.left;
    root.left = right;
    invertTree(root.left);
    invertTree(root.right);
    return root;
};

/* 
    迭代
*/

const invertTree = function(root) {
    if(!root) return null;
    let queue = [];
    queue.push(root);
    while(queue.length !== 0) {
        let node = queue.shift();
        if(node.left) queue.push(node.left);
        if(node.right) queue.push(node.right);
        let left = node.left;
        node.left = node.right;
        node.right = left;
    }
    return root;
}