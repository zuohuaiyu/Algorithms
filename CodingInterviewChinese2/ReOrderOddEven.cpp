#include <stdio.h>
#include <vector>
#include <algorithm>

using namespace std;

vector<int> exchange(vector<int> &nums)
{
    // vector<int>::iterator left = nums.begin();
    // vector<int>::iterator right = nums.end()--;
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