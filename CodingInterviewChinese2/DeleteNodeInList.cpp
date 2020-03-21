/* 
    删除链表中的节点
        1. 给定删除节点的值
        2. 给定删除节点的指针
 */

#include <stdio.h>
// #include <stdlib.h> // delete()
using namespace std;

struct ListNode
{
    int val;
    ListNode *next;
};

/* 
    下面是只给出要删除的节点的值的情况
        构建头部 dummy 节点，
        后面的操作就可以转化为一般化得链表节点移除问题
*/

ListNode *deleteNode(ListNode *head, int val)
{
    ListNode *dummyHead = new ListNode;
    dummyHead->next = head;
    ListNode *pre = dummyHead;
    ListNode *p = pre->next;
    while (p)
    {
        if (p->val == val)
        {
            pre->next = p->next;
            //delete (p);
            p = p->next;
        }
        else
        {
            pre = p;
            p = p->next;
        }
    }
    return dummyHead->next;
}

/* 
    下面是给出要删除的节点指针
        将要删除的节点的下一个节点复制到要删除的节点
        再删除它的下一个节点即可在 O(1) 内完成操作

    特殊处理：
        1） 如果是最后一个节点，还是要遍历到它的前一个节点再删除；
        2） 如果链表中只有一个结点，在删除结点之后，还需要把链表的头结点设置为NULL。
*/

ListNode *deleteNode(ListNode *head, ListNode *pToBeDelete)
{
    if (!head || !pToBeDelete)
    {
        return head;
    }
    // 不是最后一个节点
    if (pToBeDelete->next != NULL)
    {
        pToBeDelete->val = pToBeDelete->next->val;
        pToBeDelete->next = pToBeDelete->next->next;
        // delete(pToBeDelete->next);
    }
    else if (head == pToBeDelete)
    {
        // delete(pToBeDelete);
        head = NULL;
        pToBeDelete = NULL;
    }
    // 多节点，删除尾节点
    else
    {
        ListNode *p = head;
        while (p->next != pToBeDelete)
        {
            p = p->next;
        }
        p->next = NULL;
        // delete(pToBeDelete);
    }
    return head;
}

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

int main()
{
    int arr[] = {2, 7, 6, 9, 5, 4, 3};
    int len = sizeof(arr) / sizeof(arr[0]);
    ListNode *L = creatList(arr, len);

    L = deleteNode(L, 3);
    printList(L);

    L = deleteNode(L, L->next);
    printList(L);

    return 0;
}