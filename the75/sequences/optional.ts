// 152. Maximum Product Subarray
// return the product of a contiguous non-empty subarray 
// within the array that has the largest product
function maxProduct(nums: number[]): number {
    let max: number = nums[0];
    let minProd: number = nums[0];
    let maxProd: number = nums[0];
    
    for(let i = 1; i < nums.length; i++) {
        const cur = nums[i];
        
        // temp to do comparisons before updating values
        let tempMinProd = Math.min(
            cur,
            (minProd*cur), 
            (maxProd*cur)
        );
        
        maxProd = Math.max(
            cur, 
            minProd*cur, 
            maxProd*cur
        );
        
        // update after comparisons
        minProd = tempMinProd;
        
        max = Math.max(max, maxProd);
    }
    
    return max;
};

// 33. Search in Rotated Sorted Array
function searchSmartAssWay(nums: number[], target: number): number {
    return nums.indexOf(target);
};

function search(nums: number[], target: number): number {
    let start = 0;
    let end = nums.length - 1;
    
    while(start <= end) {
        const mid = ~~((end - start)/2) + start;
        
        if(nums[mid] === target) {
            return mid;
        } else if(nums[mid] >= nums[start]) {
            if(target > nums[mid] || target < nums[start]) { // right
                start = mid + 1;
            } else { // left
                end = mid - 1;
            }
        } else {
            if(target > nums[mid] && target <= nums[end]) { // right
                start = mid + 1;
            } else { // left
                end = mid - 1;
            }
        }
    }

    return -1;
};