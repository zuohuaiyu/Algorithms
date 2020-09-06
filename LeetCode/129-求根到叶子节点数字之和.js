function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

var sumNumbers = function (root) {
  return helper(root, 0);
};

function helper(root, res) {
  if (root == null) return 0;
  let temp = res * 10 + root.val;
  if (root.left == null && root.right == null) {
    return temp;
  }
  return helper(root.left, temp) + helper(root.right, temp);
}

var main = function () {
  let root = new TreeNode(1);
  let node1 = new TreeNode(2);
  let node2 = new TreeNode(3);
  root.left = node1;
  root.right = node2;
  let ans = sumNumbers(root);
  console.log(ans);
};
main();
