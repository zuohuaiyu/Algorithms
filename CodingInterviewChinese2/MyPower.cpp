/* 
    实现函数double Power(double base, int exponent)，
    求base的exponent次方。不得使用库函数，同时不需要考虑大数问题。

    100.0 < x < 100.0
    n 是 32 位有符号整数，其数值范围是 [−2^31, 2^31 − 1] 。

    思路：
    如果一次次去乘出来，超时
    高效的方法是快速幂

    1. 当 x = 0 时：直接返回 0.0 （避免后续 x = 1 / x操作报错）。
    2. 初始化 res=1 ；
    3. 当 n < 0：把问题转化至 n ≥ 0 的范围内，即执行 x = 1 / x ，n = - n；
    4. 循环计算：当 n = 0n=0 时跳出；
        1. 当n & 1 = 1 时：将当前 x 乘入 res（即 res ∗= x）；
        2. 执行 x = x^2（即 x ∗= x ）；
        3. 执行 n 右移一位（即 n >>= 1）。
    5. 返回 res 。

    注意点：
        1. 由于计算机表示小数（包括float和double型小数）都有误差，我们不能直接用等号（==）判断两个小数是否相等。如果两个小数的差的绝对值很小，比如小于0.0000001，就可以认为它们相等。
        2. int32 变量 n∈[−2147483648,2147483647] ，因此当 n = -2147483648 时执行 n=−n 会因越界而赋值出错。解决方法是先将 n 存入 long 变量 N ，后面用 N 操作即可。
*/

#include <bits/stdc++.h>
using namespace std;

bool equal(double x, double y)
{
    if (x - y < 0.000001 && x - y > -0.000001)
        return true;
    return false;
}

double myPow(double x, int n)
{
    if (equal(x, 0.0))
        return 0.0;

    long N = n;
    if (n < 0)
    {
        N = -N;
        x = 1 / x;
    }
    double res = 1.0;
    while (N)
    {
        if (N & 1)
            res *= x;
        x *= x;
        N >>= 1;
    }
    return res;
}

int main()
{
    cout << myPow(2.0, 0) << endl;
    //cout << myPow(1.0 , -2147483648) << endl;
}
