/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    let dummyHead = slow = fast = new ListNode();
    dummyHead.next = head;

    // 找中点
    while(fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    let newHead = new ListNode();
    newHead = slow.next;
    
    // 将后半段链表反转
    let newStart = reverse(null, newHead);
    // 从头开始，和后半段新头部开始，因为没有断链，所以循环退出条件是后半段遍历完
    for(let left = head; newStart != null; left = left.next, newStart = newStart.next){
        if(left.val !== newStart.val) return false;
    }
    return true;

};
function reverse(pre, cur) {
    if(!cur) return pre;
    let next = cur.next;
    cur.next = pre;
    return reverse(cur, next);
}