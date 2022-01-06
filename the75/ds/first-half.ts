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

// 153. Find Minimum in Rotated Sorted Array
// return min of rotated sorted array
function findMin(nums: number[]): number {
    
    let left: number = 0;
    let right: number = nums.length - 1;
    
    // nums in asc order OR arr length === 1
    if(nums[right] >= nums[left]) {
        return nums[left];
    }
    
    while(left <= right) {
        const mid = left + ~~((right-left) / 2);
        
        // found inflection point -> right of mid
        if(nums[mid] > nums[mid+1]) {
            return nums[mid+1];
        }
        
        // found inflection point -> left of mid
        if(nums[mid-1] > nums[mid]) {
            return nums[mid];
        }
        
        if(nums[left] <= nums[mid]) { // go right
           left = mid + 1;
        } else { // left
            right = mid - 1;
        }
    }
    
    return -1;
};

// 424. Longest Repeating Character Replacement
// sliding window
// Return the length of the longest substring containing 
// the same letter you can get after K replacements
function characterReplacement(s: string, k: number): number {
    let left: number = 0;
    let hash: Map<string, number> = new Map();
    let maxCharCount: number = 0;
    let maxLength: number = 0;
    
    for(let right = 0; right < s.length; right++) {
        const char = s[right];
        
        if(!hash.has(char)) {
            hash.set(char, 0);
        }
        
        hash.set(char, (hash.get(char) + 1));
        
        maxCharCount = Math.max(maxCharCount, hash.get(char));
        
        if( (right-left+1 - maxCharCount) > k ) {
            hash.set(s[left], (hash.get(s[left]) - 1));
            left++;
        }
        
        maxLength = Math.max(maxLength, right-left+1);
    }
    
    return maxLength;
};

// 3. Longest Substring Without Repeating Characters
// return the length of the longest substring without repeating characters
function lengthOfLongestSubstring(s: string): number {
    let maxLength: number = 0;
    let letterSet: Set<string> = new Set();
    let left: number = 0;
    
    for(let right = 0; right < s.length; right++) {
        const char: string = s[right];

        // adjust window if repeat char
        while(letterSet.has(char)) {
            letterSet.delete(s[left]);
            left++;
        }
        
        // add current char, update length
        letterSet.add(char);
        maxLength = Math.max(maxLength, right-left+1);
    }
    
    return maxLength;
};