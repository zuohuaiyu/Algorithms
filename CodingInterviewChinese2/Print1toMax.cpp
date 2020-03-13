/* 
    题目：输入数字n，按顺序打印出从1最大的n位十进制数。
        比如输入3，则打印出1、2、3一直到最大的3位数即999。
    
    思路：
        1. 在字符串上模拟数字加法的解法
        2. 数字排列组合
        3. 换其他语言... ...    

*/

#include <bits/stdc++.h>
using namespace std;

/* 
    leetcode 简化了，没有大数陷阱，可以这么用 pow
 */
vector<int> printNumbers(int n)
{
    double maxNum = pow(10.0, double(n));
    vector<int> res;
    for (double num = 1; num < maxNum; num++)
    {
        res.push_back(int(num));
    }
    return res;
}

/* 
    用 char 数组来模拟大数加法
*/

vector<int> ans;

void PrintNumber(char *number)
{
    bool isBeginning0 = true;
    int nLength = strlen(number);
    string sNum = "";
    for (int i = 0; i < nLength; i++)
    {
        if (isBeginning0 && number[i] != '0')
        {
            isBeginning0 = false;
        }
        if (!isBeginning0)
        {
            sNum += number[i];
            // printf("%c", number[i]);
        }
    }
    int num = stoi(sNum);
    ans.push_back(num);
    // printf("\t");
}

bool Increment(char *number)
{
    bool isOverflow = false;      // 越界标志
    int nTakeOver = 0;            // 进位标志
    int nLength = strlen(number); // n，因为最后一位是 '\0'
    for (int i = nLength - 1; i >= 0; i--)
    {
        int nSum = number[i] - '0' + nTakeOver;
        if (i == nLength - 1)
        {
            nSum++; // 只在第一位加1，其他位只加进位
        }
        if (nSum >= 10)
        {
            if (i == 0)
            {
                isOverflow = true; // 最高位进位，则超过了给定n的最大值，即越界
            }
            else
            {
                nTakeOver = 1;
                number[i] = nSum - 10 + '0'; // 非最高位进位，则归 0
            }
        }
        else
        {
            number[i] = nSum + '0';
            break;
        }
    }
    return isOverflow;
}

vector<int> Print1ToMaxOfNDigits_CharArray(int n)
{
    if (n <= 0)
        return ans;

    char *number = new char[n + 1];
    memset(number, '0', n);
    number[n] = '\0';

    while (!Increment(number))
    {
        PrintNumber(number);
    }
    delete[] number;
    return ans;
}

/* 
    全排列
*/

void SaveNumber(string number)
{
    bool isBeginning0 = true;
    string strNum = "";
    string::iterator it = number.begin();
    while (it != number.end())
    {
        if(isBeginning0 && *it != '0') isBeginning0 = false;
        if(!isBeginning0)
        {
            strNum += *it;
        }
        it++;
    }
    if(strNum != "")
    {
        int num = stoi(strNum);
        ans.push_back(num);
    }
}

void PermutationNumbers(string &number, int length, int index)
{
    if (index == length)
    {
        SaveNumber(number);
        return;
    }

    for (int i = 0; i < 10; i++)
    {
        number[index] = i + '0';
        PermutationNumbers(number, length, index + 1);
    }
}

vector<int> Print1ToMaxOfNDigits_Permutation(int n)
{
    if (n <= 0)
        return ans;

    string number(n, '0');

    for (int i = 0; i < 10; i++)
    {
        number[0] = i + '0';
        PermutationNumbers(number, n, 1);
    }
    return ans;
}

int main()
{
    vector<int> ans1 = Print1ToMaxOfNDigits_CharArray(2);
    vector<int> ans2 = Print1ToMaxOfNDigits_Permutation(2);
    for (int i = 0; i < ans2.size(); i++)
    {
        cout << ans2[i] << " ";
    }
}