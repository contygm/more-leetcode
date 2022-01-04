
// 1. Two Sum
// return indices of the two nums such that they add up to target
function twoSum(nums: number[], target: number): number[] {
    const hashMap:Map<number, number> = new Map();
    
    // key = #, value = index
    for(let i = 0; i < nums.length; i++) {
        const diff: number = target - nums[i];
        
        if(hashMap.has(diff)) {
            return [hashMap.get(diff), i];
        }
        
        hashMap.set(nums[i], i);
    }
};

// 217. Contains Duplicate 
// return true if nums contains duplicate, else false
function containsDuplicate(nums: number[]): boolean {
    let hash:boolean[] = [];
    
    for (var i = 0; i < nums.length; i++) {
        
        if (hash[nums[i]]) {
            return true;
        }
        
        hash[nums[i]] = true;
    }
    
    return false;
};

// 121. Best Time to Buy and Sell Stock
// Return the maximum profit you can achieve through buy/sell
function maxProfit(prices: number[]): number {
    // looking for greatest positive diff
    let minPrice: number = Number.MAX_SAFE_INTEGER;
    let maxProfit: number = 0;
    
    for(const p of prices) {
        if(p < minPrice) {
            minPrice = p;
        }
        
        const diff: number = p - minPrice;
        
        if(diff > maxProfit) {
           maxProfit = diff;
        }
    }
    
    return maxProfit;
};

// 242. Valid Anagram
// return if t is anagram of s
function isAnagram(s: string, t: string): boolean {
    let hash:Map<string, number> = new Map();
    
    if(s.length !== t.length) {
         return false;
    }
    
    // make hash
    for(var i = 0; i < s.length; i++) {
        const char = s[i];
        
        if(hash.has(char)) {
            const newCount = hash.get(char)+1;
            hash.set(char, newCount);
        } else {
            hash.set(char, 1);
        }
    }
    
    for(var i = 0; i < t.length; i++) {
        const char = t[i];
        
        if(!hash.has(char)) {
            return false;
        }
        
        const newCount = hash.get(char)-1;
        
        if(newCount < 0) {
            return false;
        }
        
        hash.set(char, newCount);
    }
    
    return true;
};

// 20. Valid Parentheses
// determine if input string has valid parens
function isValid(s: string): boolean {
    // treat array as stack for parens
    let pStack:string[] = [];
    
    // check parens
    for (var i = 0; i < s.length; i++) {
        const char:string = s[i]; 
        // handle open paren
        if( /[{[(]/.test(char) ) { 
            pStack.push(char);
            continue;
        }
            
        // handle close paren
        let lastParen:string = pStack.pop();
        
        switch (char) { // check parens match
            case "}":
                if (lastParen !== "{") {
                    return false;
                }
                break;
            case "]":
                 if (lastParen !== "[") {
                    return false;
                }
                break;
            case ")": 
                 if (lastParen !== "(") {
                    return false;
                }
                break;
            default: // alphanumeric, so skip
                break; 
        } 
            
    }
    
    // stack is empty if s is valid
    if(pStack.length === 0) {
        return true;
    }
    
    return false;
};


