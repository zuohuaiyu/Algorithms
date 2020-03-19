/* 
    把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
    输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。
    例如，数组 [3, 4, 5, 1, 2] 为[1, 2, 3, 4, 5] 的一个旋转，该数组的最小值为1。  
*/

#include <bits/stdc++.h>
using namespace std;

int minNumberInRotateArray(vector<int> numbers)
{
    int len = numbers.size();
    int start = 0, end = len - 1;
    while (start < end)
    {
        int mid = (start + end) / 2;
        if (numbers[mid] < numbers[end])
            end = mid;
        else if (numbers[mid] > numbers[end])
            start = mid + 1;
        else if (numbers[mid] == numbers[end])
            --end;
    }
    return numbers[end];
}

int main()
{
    int arr[] = {3, 4, 5, 0, 1, 2};
    vector<int> numbs(arr, arr + 6);
    int ans = minNumberInRotateArray(numbs);
    cout << ans << endl;
}