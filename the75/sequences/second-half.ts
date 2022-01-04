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

