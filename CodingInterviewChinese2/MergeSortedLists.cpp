/* 
    合并两个排序的链表

    题目：
        输入两个递增排序的链表，合并这两个链表并使新链表中的结点仍然是按照递增排序的。
    
    思路：
        从两个链表头结点开始比较，将小的结点
    
    功能测试：
        输入空的链表.
        常规链表。
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

ListNode *mergeLists(ListNode *head1, ListNode *head2)
{
    ListNode *mergedHead = NULL;
    if (head1 == NULL)
    {
        return head2;
    }
    else if (head2 == NULL)
    {
        return head1;
    }
    if (head1->val < head2->val)
    {
        mergedHead = head1;
        ListNode *preNode = head1;
        head1 = head1->next;
        while (head1 != NULL && head2 != NULL)
        {
            if (head1->val < head2->val)
            {
                preNode->next = head1;
                preNode = preNode->next;
                head1 = head1->next;
            }
            else
            {
                preNode->next = head2;
                preNode = preNode->next;
                head2 = head2->next;
            }
        }
        if (head1 == NULL)
        {
            preNode->next = head2;
        }
        else if (head2 == NULL)
        {
            preNode->next = head1;
        }
    }
    else
    {
        mergedHead = head2;
        ListNode *preNode = head2;
        head2 = head2->next;
        while (head1 != NULL && head2 != NULL)
        {
            if (head1->val < head2->val)
            {
                preNode->next = head1;
                preNode = preNode->next;
                head1 = head1->next;
            }
            else
            {
                preNode->next = head2;
                preNode = preNode->next;
                head2 = head2->next;
            }
        }
        if (head1 == NULL)
        {
            preNode->next = head2;
        }
        else if (head2 == NULL)
        {
            preNode->next = head1;
        }
    }
    return mergedHead;
}

int main()
{
    int arr1[] = {1, 3, 5, 7, 9};
    // int arr1[] = {1};
    // int arr1[] = {};

    int arr2[] = {2, 3, 4, 6, 7};
    // int arr2[] = {1};
    // int arr2[] = {};
    int len1 = sizeof(arr1) / sizeof(arr1[0]);
    int len2 = sizeof(arr2) / sizeof(arr2[0]);
    ListNode *L1 = creatList(arr1, len1);
    ListNode *L2 = creatList(arr2, len2);

    ListNode *L = mergeLists(L1, L2);
    printList(L);
    return 0;
}