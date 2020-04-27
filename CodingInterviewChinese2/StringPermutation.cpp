/* 
    题目：
    
    输入一个字符串，打印出该字符串中字符的所有排列。
    例如输入字符串abc，则打印出由字符a、b、c所能排列出来的所有字符串abc、acb、bac、bca、cab和cba。

    思路：

    把字符串分为两部分，第一个字符，和剩下的字符
    将第一个字符和剩下的字符逐一交换，获得第一个字符位置的每种可能
    对剩下的字符进行递归

    
    测试：

    功能测试（输入的字符串中有1个或者多个字符）。
    特殊输入测试（输入的字符串的内容为空或者是NULL指针）。
 */

#include <stdio.h>
#include <iostream>
#include <vector>
#include <string>
#include <set>
#include <algorithm>
using namespace std;

void recur(string s, int start, vector<string> &res)
{
    if (start == s.size() - 1)
    {
        res.push_back(s);
        return;
    }

    for (int i = start; i < s.size(); i++)
    {
        if (i != start && s[i] == s[start])
            continue;
        if (i > 0 && s[start] == s[start - 1])
            continue;
        swap(s[i], s[start]);
        recur(s, start + 1, res);
        swap(s[i], s[start]);
    }
}

vector<string> permutation(string s)
{
    if (s.empty())
    {
        return {};
    }
    vector<string> res;
    recur(s, 0, res);
    return res;
    // set<string> res;
    // recur(s, 0, res);
    // return vector<string>(res.begin(), res.end());
}

// 现成的 next_permutation... ...
vector<string> nextPermutation(string s)
{
    vector<string> ans;
    sort(s.begin(), s.end());
    do
    {
        ans.push_back(s);
    } while (next_permutation(s.begin(), s.end()));

    return ans;
}

// 剪枝

int main()
{
    string str = "accc";
    vector<string> res = permutation(str);
    for (int i = 0; i < res.size(); i++)
    {
        // printf("% ", res[i]);
        cout << res[i] << endl;
    }
    return 0;
}