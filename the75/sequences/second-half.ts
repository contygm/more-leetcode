// 238. Product of Array Except Self
// return an array answer such that answer[i] is equal 
// to the product of all the elements of nums except nums[i]
function productExceptSelf(nums: number[]): number[] {
    let res: number[] = [];
    
    // prefix products
    res[0] = 1;
    for(let i: number = 1; i < nums.length; i++) {
        res[i] = nums[i-1] * res[i-1];
    } 
    
    // suffix products
    let right: number = 1;
    for(let k: number = nums.length - 1; k >= 0; k--) {
        res[k] = res[k] * right;
        right *= nums[k];
    } 
    
    return res;
};

// 53. Maximum Subarray
// return sum of the contiguous subarray
// which has the largest sum
function maxSubArray(nums: number[]): number {
    let maxSum: number = Number.MAX_SAFE_INTEGER * -1;
    let currSum: number = 0;
    
    for(const curr of nums) {
        currSum = Math.max(curr, curr + currSum);
        maxSum = Math.max(maxSum, currSum);
    }
    
    
    return maxSum;
};

// 15. 3Sum
// return unique triplets that === 0
// no dupes w/i triplets
function threeSum(nums: number[]): number[][] {
    // asc order
    nums.sort((a, b) => a-b);
    
    let res: number[][] = [];
    
    const twoSum = (index: number): void => {
        
        let left = index + 1;
        let right = nums.length - 1;
        
        while( left < right) {
            const sum = nums[index] + nums[left] + nums[right];
            
            if (sum === 0) { // target = 0
                res.push([nums[index], nums[left], nums[right]]);
                left++;
                right--;
                // skip duplicates
                while(left < right && nums[left] === nums[left - 1]) {
                    left++;
                }
            } else if (sum > 0) {
                right--;
            } else {
                left++;
            }
        }
        
    }
    
    // 3sum -> try 2sum with every array element
    for(let i = 0; i < nums.length; i++) {
        if(i === 0 || nums[i] !== nums[i-1]) {
            twoSum(i);
        }
    }

    return res;
};

// 56. Merge Intervals
// return an array of the non-overlapping, non-sorted 
// intervals that cover all the intervals in the input.
function merge(intervals: number[][]): number[][] {
    
    if(intervals.length <= 1) return intervals;
    
    // sort intervals
    intervals.sort((a, b) => a[0] - b[0]);
    
    for (let i = 1; i < intervals.length; i++) {
        const curr = intervals[i];
        const prev = intervals[i-1];
        
        if(curr[0] <= prev[1]) {
            prev[1] = Math.max(curr[1], prev[1]);
            intervals.splice(i, 1); // remove absorbed interval
            i--;
        }
    }
    
    return intervals;
};

// 49. Group Anagrams
// return grouped anagrams
function groupAnagrams(strs: string[]): string[][] {
    let gramHash: Map<string, string[]> = new Map();
    
    for(const s of strs) {
        const sortedStr: string = s.split("").sort().join("");
        
        const group: string[] = gramHash.get(sortedStr) || [];
        group.push(s);
        gramHash.set(sortedStr, group);
    }
    
    return Array.from(gramHash.values());
};