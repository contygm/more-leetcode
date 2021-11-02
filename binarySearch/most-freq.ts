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
    const xLen = nums1.length,
          yLen = nums2.length;
    
    // NOTE: SHORTER ONE MUST GO FIRST OR YOU'LL SPEND HOURS WONDERING WTF IS WRONG
    if (xLen > yLen) {
        return findMedianSortedArrays(nums2, nums1);
    }
    
    let left = 0,
        right = xLen; 
     
    while(left <= right) {
        const xMid = ~~((left+right)/2);
        const yMid = ~~((xLen + yLen + 1)/2) - xMid; // +1 helps with odd 
        
        // check for undefined + establish array bounds
        const maxX_L = nums1[xMid - 1] ?? Number.NEGATIVE_INFINITY;
        const maxY_L = nums2[yMid - 1] ?? Number.NEGATIVE_INFINITY;
        
        const minX_R = nums1[xMid] ?? Number.POSITIVE_INFINITY;
        const minY_R = nums2[yMid] ?? Number.POSITIVE_INFINITY;
        
        if( maxX_L <= minY_R && maxY_L <= minX_R) { // found
            const leftMax = Math.max(maxX_L, maxY_L);
            
            // odd
            if((nums1.length + nums2.length) % 2 === 1) { 
                return leftMax;
            }
            
            // even
            return (( Math.max(maxX_L, maxY_L) + Math.min(minX_R, minY_R) )/2);
        } else if ( maxY_L >  minX_R ) {
            // x -> 
            left = xMid + 1; 
        } else {
            // <- x
            right = xMid - 1;
        }
    }
    
    return -1;
};