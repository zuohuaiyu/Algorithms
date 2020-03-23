/* 
    树的子结构
    题目：
        输入两棵二叉树A和B，判断B是不是A的子结构。

    思路：
        1. 需要从每一个节点作为第一个节点去比对A、B；
        2. 如果当前节点值相等，则递归对比左右节点，
           不相等，则递归从左右节点开始对比；
        3. 递归判断时，当 B 到了叶子节点则返回true，
           而如果是到了 A 的叶子节点或者值不相等返回false，
           都没到，则继续递归左右节点。
 */
#include <stdio.h>
#include <iostream>
#include <queue>
using namespace std;

struct TreeNode
{
    int val;
    TreeNode *leftNode;
    TreeNode *rightNode;
};
queue<TreeNode *> insertQueue;

void preorder(TreeNode *root)
{
    if (root == NULL)
    {
        return;
    }
    printf("%d ", root->val);
    preorder(root->leftNode);
    preorder(root->rightNode);
}

void insert(int val)
{
    TreeNode *parent = insertQueue.front();

    TreeNode *newNode = new TreeNode();
    newNode->val = val;
    newNode->leftNode = NULL;
    newNode->rightNode = NULL;

    if (parent->leftNode == NULL)
    {
        parent->leftNode = newNode;
        insertQueue.push(newNode);
    }
    else if (parent->rightNode == NULL)
    {
        parent->rightNode = newNode;
        insertQueue.pop();
        insertQueue.push(newNode);
    }
}

TreeNode *CreatTree(int data[], int n)
{
    TreeNode *root = new TreeNode();
    root->val = data[0];
    root->leftNode = NULL;
    root->rightNode = NULL;
    insertQueue.push(root);
    for (int i = 1; i < n; ++i)
    {
        insert(data[i]);
    }
    // 清空辅助队列，防止下一次建树用到上一次建树所用的队列信息
    while (!insertQueue.empty())
        insertQueue.pop();
    return root;
}

bool doseSubTreeEqul(TreeNode *A, TreeNode *B)
{
    if (B == NULL)
    {
        return true;
    }
    if (A == NULL || A->val != B->val)
    {
        return false;
    }
    return doseSubTreeEqul(A->leftNode, B->leftNode) && doseSubTreeEqul(A->rightNode, B->rightNode);
}

bool isSubStructure(TreeNode *A, TreeNode *B)
{
    bool res = false;
    if (A != NULL && B != NULL)
    {
        if (A->val == B->val)
        {
            res = doseSubTreeEqul(A, B);
        }
        if (!res)
        {
            res = isSubStructure(A->leftNode, B);
        }
        if (!res)
        {
            res = isSubStructure(A->rightNode, B);
        }
    }
    return res;
}

int main()
{
    int data1[] = {3, 4, 5, 1, 2};
    int data2[] = {4, 1};
    int len1 = sizeof(data1) / sizeof(data1[0]);
    int len2 = sizeof(data2) / sizeof(data2[0]);
    TreeNode *Tree1 = CreatTree(data1, len1);
    TreeNode *Tree2 = CreatTree(data2, len2);

    preorder(Tree1);
    preorder(Tree2);

    bool ans = isSubStructure(Tree1, Tree2);
    cout << ans << endl;
    return 0;
}