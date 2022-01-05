/**
 * Definition for **SINGLY** LINKED LIST.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */


 class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

// 206. Reverse Linked List
function reverseList(head: ListNode | null): ListNode | null {
    
    let newHead: ListNode = null;
    
    while(head) {
        const temp: ListNode = head.next;
        head.next = newHead;
        newHead = head;
        head = temp;
    }
    
    return newHead;
};

// 141. Linked List Cycle
// Return true if there is a cycle in the linked list
function hasCycle(head: ListNode | null): boolean {
    
    if(!head) return false;
    
    let slow: ListNode = head;
    let fast: ListNode = head.next;
    
    while(fast !== slow) {
        // reached end, no cycle
        if(!fast || !fast.next) {
            return false;
        }
        
        // update pointers
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return true;
};

// 11. Container With Most Water
// Return the maximum amount of water a container can store.
function maxArea(height: number[]): number {
    let max: number = 0;
    let left: number = 0;
    let right: number = height.length - 1;
    
    while(left < right) {
        const length = right - left;
        const currHeight = Math.min(height[right], height[left]);
        
        max = Math.max(max, length*currHeight);
        
        if(height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return max;
};
