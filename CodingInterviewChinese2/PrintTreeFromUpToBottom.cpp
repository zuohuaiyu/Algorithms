/* 
    题目：
        从上往下打印出二叉树的每个结点，同一层的结点按照从左到右的顺序打印。
        例如输入图4.5中的二叉树，则依次打印出8、6、10、5、7、9、11。
    思路：
        层序遍历
        每一次打印一个结点的时候，如果该结点有子结点，则把该结点的子结点放到一个队列的末尾。
        接下来到队列的头部取出最早进入队列的结点，重复前面的打印操作，直至队列中所有的结点都被打印出来为止。
*/

#include <stdio.h>
#include <deque>
using namespace std;

struct BTree
{
    int val;
    BTree *leftChild;
    BTree *rightChild;
};

void PrintTreeFromUpToBottom(BTree *root)
{

}

int main()
{

    return 0;
}