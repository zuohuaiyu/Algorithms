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

const { worker } = require("cluster");

// --------------------- 迭代 -------------------------- //
var inorderTraversal = function(root) {
    let stack = [], curr = root;
    let res = [];
    while(curr != null || stack.length != 0) {
        while(curr != null) {
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop();
        res.push(curr.val);
        curr = curr.right;
    }
    return res;
};

// --------------------------- 递归 ------------------------ //

const inorderTraversal = function(root) {
    let res = [];
    helper(root, res);
    return res;
}

const helper = function (root, res) {
    if(root != null) {
        if(root.left != null) {
            helper(root.left, res);
        }
        res.push(root.val);
        if(root.right != null) {
            helper(root.right, res);
        }
    }
}