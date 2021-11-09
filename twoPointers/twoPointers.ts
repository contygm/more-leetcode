// 125. Valid Palindrome - reviewed cuz did it already
function isPalindrome(s: string): boolean {
    
    // ignore case and remove spaces + special chars
    const cleanStr = s.toLowerCase().replace(/[^0-9a-z]/gi,'');
    
    for(var left = 0; left < cleanStr.length/2; left++){
        const right = cleanStr.length-1-left;
        
        if(cleanStr[left] !== cleanStr[right]) {
            return false
        }
    }
    
    return true;
};

// 344. Reverse String - reviewed cuz did it already
function reverseString(s: string[]): void {
    
    let left = 0;
    let right = s.length - 1; 

    while(left < right) {
        
        // swap
        var temp = s[left]; 
        s[left] = s[right];
        s[right] = temp;
        
        left++;
        right--;
    }
    
};

// 905. Sort Array By Parity
function sortArrayByParity(nums: number[]): number[] {
    let left: number = 0, 
        right: number = nums.length - 1; 
    
    while ( left < right ) {
        // if odd + even
        if( nums[left] % 2 > nums[right] % 2 ) {
            const temp: number = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
        }
        
        // if even, move to next
        if(nums[left] % 2 === 0) {  
            left++;
        } 
        
        // if odd, move to next 
        if(nums[right] % 2 === 1) {
            right--;
        }
    }
    
    return nums;
};

//  876. Middle of the Linked List
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
// return second node if 2 middle nodes
function middleNode(head: ListNode | null): ListNode | null {
    let slow: ListNode | null = head, 
        fast: ListNode | null = head; 
    
    while( fast != null && fast.next != null ) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;
};

// 680. Valid Palindrome II
function validPalindrome(s: string): boolean {
    
    const checkValid = ( left:number, right:number, hasDeleted:boolean): boolean => {
        while(left <= right) {
            if( s[left] !== s[right] && hasDeleted) {
                return false;
            } else if ( s[left] !== s[right]) {
                // skip right and left char, see which is valid
                return checkValid(left+1, right, true) || checkValid(left, right-1, true);
            }

            left++;
            right--;
        }
        
        return true;
    }
    
    return checkValid(0, s.length-1, false);
};