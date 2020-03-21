/* 
    反转链表
    
    题目：
        定义一个函数，输入一个链表的头结点，反转该链表并输出反转后链表的头结点。

    思路：
        定义三个指针，分别指向当前结点，它的前一个和后一个结点
        当前节点有下一个节点时，则用指针记录它，防止断链
        将当前节点的下一个节点的指针指向前一个节点
        平移三个指针
    
    功能测试：
        输入的链表头指针是NULL。
        输入的链表只有一个结点。
        输入的链表有多个结点。
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

void printList(ListNode *head)
{
    while (head)
    {
        printf("%d", head->val);
        head = head->next;
    }
    printf("\n");
}

ListNode *ReverseList(ListNode *head)
{
    ListNode *reversedHead = NULL;

    ListNode *preNode = NULL;
    ListNode *node = head;
    ListNode *nextNode = NULL;
    while (node != NULL)
    {
        nextNode = node->next;
        if(nextNode == NULL)
        {
            reversedHead = node;
        }
        node->next = preNode;
        
        preNode = node;
        node = nextNode;
    }
    return reversedHead;
}

int main()
{
    int arr[] = {2, 7, 6, 9, 5, 4, 3};
    int len = sizeof(arr) / sizeof(arr[0]);
    ListNode *L = creatList(arr, len);

    L = ReverseList(L);
    printList(L);
    return 0;
}
