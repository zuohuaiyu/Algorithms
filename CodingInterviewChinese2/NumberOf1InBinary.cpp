/* 
位运算：

请实现一个函数，输入一个整数，输出该数二进制表示中 1 的个数。
例如把9表示成二进制是1001，有2位是1。因此如果输入9，该函数输出2。

举一反三：
把一个整数减去 1 之后再和原来的整数做位与运算，
得到的结果相当于是把整数的二进制表示中的最右边一个1变成0。
很多二进制的问题都可以用这个思路解决。 
*/

#include <bits/stdc++.h>
using namespace std;

// 常规思路
int NumberOf1(int n)
{
    int count = 0;
    unsigned int flag = 1;
    while (flag)
    {
        if (n & flag)
        {
            ++count;
        }
        flag = flag << 1;
    }
    return count;
}

// 惊喜思路
/* 
    因为把一个整数减去1，再和原整数做与运算，会把该整数最右边一个1变成0。
    那么一个整数的二进制表示中有多少个1，就可以进行多少次这样的操作。
*/
int NumberOf1_2(int n)
{
    int count = 0;
    while (n)
    {
        ++count;
        n = (n - 1) & n;
    }
    return count;
}

//相关题目
/* 
    用一条语句判断一个整数是不是2的整数次方。
    一个整数如果是2的整数次方，那么它的二进制表示中有且只有一位是1，而其他所有位都是0。
    思路：把这个整数减去1之后再和它自己做与运算，这个整数中唯一的1就会变成0。
*/

bool IsIntegerPowerOf2(int n)
{
    if ((n - 1) & n)
        return false;
    return true;
}

//相关题目
/* 
    输入两个整数m和n，计算需要改变m的二进制表示中的多少位才能得到 n。
    比如 10 的二进制表示为1010，13 的二进制表示为1101，需要改变1010中的3位才能得到1101。
    我们可以分为两步解决这个问题：第一步求这两个数的异或，第二步统计异或结果中1的位数。
*/

int NumberDiffOf1(int n, int m)
{
    int tmp = n ^ m;
    return NumberOf1(tmp);
}

int main()
{
    int numbers = 5;
    cout << NumberOf1(numbers) << endl;
    cout << NumberOf1_2(numbers) << endl;
    cout << IsIntegerPowerOf2(numbers) << endl;
    cout << NumberDiffOf1(5, 4) << endl;
}
