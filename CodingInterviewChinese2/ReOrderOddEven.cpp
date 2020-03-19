/*
    调整数组顺序使奇数位于偶数前面
    
    题目：输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有
        奇数位于数组的前半部分，所有偶数位于数组的后半部分。
*/

#include <stdio.h>
#include <vector>
#include <algorithm>

using namespace std;

vector<int> exchange(vector<int> &nums)
{
    int left = 0, right = nums.size() - 1;
    while (left < right)
    {
        while (left < right && (nums[left] & 1) == 1)
        {
            left++;
        }
        while (left < right && (nums[right] & 1) == 0)
        {
            right--;
        }
        if (left < right)
            swap(nums[left], nums[right]);
    }
    return nums;
}

vector<int> exchange1(vector<int> &nums)
{
    int left = 0, right = nums.size() - 1;
    while (left < right)
    {
        if ((nums[left] & 1) != 0)
        {
            left++;
            continue;
        }
        if ((nums[right] & 1) != 1)
        {
            right--;
            continue;
        }
        swap(nums[left], nums[right]);
    }
    return nums;
}
int main()
{
    vector<int> arr;
    arr = {2, 3, 1, 4, 5};
    exchange(arr);
    for (vector<int>::iterator it = arr.begin(); it != arr.end(); it++)
    {
        printf("%d ", *it);
    }
    return 0;
}