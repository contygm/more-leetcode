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

// 4. Median of Two Sorted Arrays
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {    
    let left = 0,
        right = nums1.length;
        
    while(left <= right) {
        const xMid = ~~((left+right)/2);
        const yMid = ~~((nums1.length + nums2.length)/2) - xMid;
        
        const maxLeftX = nums1[xMid - 1] ?? Number.NEGATIVE_INFINITY;
        const maxLeftY = nums2[yMid - 1] ?? Number.NEGATIVE_INFINITY;
        
        const minRightX = nums1[xMid] ?? Number.POSITIVE_INFINITY;
        const minRightY = nums2[yMid] ?? Number.POSITIVE_INFINITY;
        
        // console.log("maxLeftX: ", maxLeftX, " minRightX: ", minRightX); 
        // console.log("maxLeftY: ", maxLeftY, " minRightY: ", minRightY); 
        
        if( maxLeftX <= minRightY && maxLeftY <= minRightX) { // found
            const rightMin = Math.min(minRightX, minRightY);
            // console.log("leftMax ", leftMax);
            // console.log("rightMin ", rightMin);
            
            // odd
            if((nums1.length + nums2.length) % 2 === 1) { 
                return rightMin;
            }
            // even
            // console.log("even endd ", (( leftMax + Math.min(minRightX, minRightY) )/2));
            return (( Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY) )/2);
        } else if ( maxLeftY >  minRightX) {
            // x ->
            left = xMid + 1; 
        } else {
            // <- x
            right = xMid - 1;
        }
    }
    
    return -1;
};
// base
// [1,3]
// [2]

// [1,2]
// [3,4]

// [0,0]
// [0,0]

// []
// [1]

// [2]
// [] ***
// failing ones 
// [1,2,3,5,6]
// [4]

// [3,4,5,6]
// [1,2]