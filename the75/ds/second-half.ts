// 76. Minimum Window Substring
// massive sliding window
// return the minimum window substring of s such that every 
// character in t (including duplicates) is included in the window.
function minWindow(s: string, t: string): string {
    
    if(s.length < t.length || s.length === 0 || t.length === 0) {
        return "";
    }

    let letterHash: Map<string, number> = new Map();
    
    // make hash from t
    for(const char of t) {
        if(!letterHash.has(char)) {
           letterHash.set(char, 0);
        }
        letterHash.set(char, letterHash.get(char)+1);
    }
        
    // sliding window
    let result: string = "";
    let windowHash: Map<string, number> = new Map();
    let left:number = 0;
    let right:number = 0;
    let requiredCount = 0;
    
    while(right < s.length) {
        const char: string = s[right];
        
        // add required letter to windowHash if needed
        if(!windowHash.has(char) && letterHash.has(char)) {
            windowHash.set(char, 0);
        }
        
        // updated letter count
        if(letterHash.has(char)) {
            windowHash.set(char, windowHash.get(char)+1);
        }
        
        // hit quota for required letter
        if(letterHash.has(char) && 
           windowHash.get(char) === letterHash.get(char)
        ) {
            requiredCount++;
        }
        
        // try to contract window from left
        while(left <= right && requiredCount === letterHash.size) {
            const curr = s[left]; 
            
            // update result if new shortest string
            if(right-left+1 < result.length || result.length === 0) {
                result = s.slice(left, right+1);
            }
            
            // decrease letter count
            if(windowHash.has(curr)) {
                windowHash.set(curr, windowHash.get(curr)-1);
            }
            
            // decrease quota count if needed
            if(windowHash.has(curr) && windowHash.get(curr) < letterHash.get(curr)) {
                requiredCount--;
            }
            left++;
        }
        // expand window right
        right++;
    }
    
    return result;
};

// 200. Number of Islands
// done already

// 19. Remove Nth Node From End of List
// remove Nth node from the end of singely linked list
// return head of modified list
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    let dummyHead: ListNode = new ListNode(0, head);
    
    // set fast pointer to N ahead of slow
    let fast: ListNode = dummyHead;
    for(let i = 0; i < n; i++) {
        fast = fast.next;
    }
    
	// find correct node
    let slow: ListNode = dummyHead;
    while(fast) {
        // remove correct node
        if(!fast.next) {
            slow.next = slow.next.next;
            break;
        }
        
        slow = slow.next;
        fast = fast.next;
    }
    
    return dummyHead.next;
};