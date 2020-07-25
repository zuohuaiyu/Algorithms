/* 
    1、如果两者之一为另一方的祖先，左右递归，会有一边返回为 null
    2、如果分别在 root 的两边，那么root为公共祖先
*/

function lowestCommonAncestor(root, p, q) {
    if(!root || root == q || root == p) return root;
    let left = lowestCommonAncestor(root.left, p, q);
    let right = lowestCommonAncestor(root.right, p, q);
    if(left && right) return root;
    return left? left : right;
}