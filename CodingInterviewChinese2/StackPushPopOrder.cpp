/* 
    题目：
        输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否为该栈的弹出顺序。假设压入栈的所有数字均不相等。
        例如序列1、2、3、4、5 是某栈的压栈序列，序列4、5、3、2、1 是该压栈序列对应的一个弹出序列，
        但 4、3、5、1、2 就不可能是该压栈序列的弹出序列。
    思路：
        按照 popped 中的顺序模拟一下出栈操作，如果符合则返回 true，否则返回 false。
        贪心：如果栈顶元素等于 popped 序列中下一个要 pop 的值，则应立刻将该值 pop 出来。
    
 */

#include <stdio.h>
#include <vector>
#include <stack>
using namespace std;

bool validateStackSequences(vector<int> &pushed, vector<int> &popped)
{
    if (pushed.size() == 0)
        return true;

    stack<int> st;
    int pushLen = pushed.size();
    int popLen = popped.size();
    int j = 0;
    for (int i = 0; i < pushLen; i++)
    {
        st.push(pushed[i]);
        while (!st.empty() && j < popLen && st.top() == popped[j])
        {
            st.pop();
            j++;
        }
    }
    return st.empty();
}
int main()
{
    vector<int> pushed = {8, 9, 2, 3, 7, 0, 5, 4, 6, 1};
    vector<int> poped = {6, 8, 2, 1, 3, 9, 0, 7, 4, 5};
    bool res = validateStackSequences(pushed, poped);
    printf("%d", res);
}