/* 
    链表中倒数第k个结点
    
    题目：输入一个链表，输出该链表中倒数第k个结点。为了符合大多数人的习惯，
        本题从1开始计数，即链表的尾结点是倒数第1个结点。例如一个链表有6个结点，
        从头结点开始它们的值依次是1、2、3、4、5、6。这个链表的倒数第3个结点是
        值为4的结点。
    思路：
        1. 定义两个指针。第一个指针从链表的头指针开始遍历向前走k-1，第二个指针保持不动；
        2. 从第 k 步开始，第二个指针也开始从链表的头指针开始遍历。
        3. 由于两个指针的距离保持在k-1，当第一个（走在前面的）指针到达链表的尾结点时，第二个指针（走在后面的）指针正好是倒数第k个结点。
    注意点：
        1. 参数 head 为 空指针
        2. k = 0
        3. 链表不足 k
 */

#include <stdio.h>
using namespace std;

struct ListNode
{
    int val;
    ListNode *next;
};

ListNode *creatList(int arr[], int len)
{
    if (len == 0)
    {
        return NULL;
    }
    ListNode *p, *pre, *head;
    head = new ListNode;
    head->next = NULL;
    head->val = arr[0];
    pre = head;
    for (int index = 1; index < len; ++index)
    {
        p = new ListNode;
        p->val = arr[index];
        p->next = NULL;
        pre->next = p;
        pre = p;
    }
    return head;
}

ListNode *KthNodeFromEnd(ListNode *head, int k)
{
    if (head == NULL || k <= 0)
        return NULL;
    ListNode *first = head;
    ListNode *kth = head;
    for (int i = 0; i < k - 1; i++)
    {
        // 防止没有 k 个节点时出现 空指针 情况
        if (first->next != NULL)
        {
            first = first->next;
        }
        else
        {
            return NULL;
        }
    }
    while (first->next != NULL)
    {
        first = first->next;
        kth = kth->next;
    }
    return kth;
}

int main()
{
    int arr[] = {2, 7, 6, 9, 5, 4, 3};
    int len = sizeof(arr) / sizeof(arr[0]);
    ListNode *L = creatList(arr, len);

    ListNode *res = new ListNode;
    res = KthNodeFromEnd(L, 0);
    printf("%d ", res->val);
}