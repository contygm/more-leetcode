// 162. Find Peak Element
function findPeakElement(nums: number[]): number {
    let left = 0,
        right = nums.length - 1;
        
    while(left < right) {
        const mid = ~~((left + right)/2)
        
        if(nums[mid] > nums[mid+1]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return right;
};

// 528. Random Pick with Weight
class Solution {
    nums: number[];
    total: number;

    constructor(w: number[]) {
        this.nums = [];
        let sum = 0;
        
        for(let n of w) {
            sum += n;
            this.nums.push(sum);
        }

        this.total = sum; 
    }

    pickIndex(): number {

        let target: number = Math.random() * this.total,
            left: number = 0, 
            right: number = this.nums.length;

        while(left < right) {
            const mid: number = ~~((left + right) / 2);
            
            if(this.nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        return right;
    }
}