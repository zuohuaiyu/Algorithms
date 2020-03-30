/* 
    题目：
        输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字

    思路： 
        空值处理： 当 matrix 为空时，直接返回空列表 [] 即可。
        循环打印： “从左向右、从上向下、从右向左、从下向上” 四个方向循环，每个方向打印中做以下三件事 ；
        根据边界打印，即将元素按顺序添加至列表 res 尾部；
        边界向内收缩；
        判断是否打印完毕（边界是否相遇），若打印完毕则跳出。
        返回值： 返回 res 即可。
 */

#include <stdio.h>
#include <vector>
using namespace std;

vector<int> PrintMatrix(vector<vector<int>> matrix)
{
    vector<int> res = {};
    if (matrix.size() == 0)
        return res;

    int top, left, bottom, right;
    top = left = 0;
    bottom = matrix.size() - 1;
    right = matrix[0].size() - 1;
    while (true)
    {
        for (int i = top, j = left; j <= right; ++j)
        {
            res.push_back(matrix[i][j]);
        }
        top++;
        if (top > bottom)
            break;
        for (int i = right, j = top; j <= bottom; ++j)
        {
            res.push_back(matrix[j][i]);
        }
        right--;
        if (right < left)
            break;
        for (int i = bottom, j = right; j >= left; --j)
        {
            res.push_back(matrix[i][j]);
        }
        bottom--;
        if (bottom < top)
            break;
        for (int i = left, j = bottom; j >= top; --j)
        {
            res.push_back(matrix[j][i]);
        }
        left++;
        if(left > right)
            break;
    }
    return res;
}

int main()
{
    vector<vector<int>> matrix;
    matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    vector<int> res = {};
    res = PrintMatrix(matrix);
    for (int i = 0; i < res.size(); i++)
    {
        printf("%d ", res[i]);
    }
    return 0;
}