
// 349. Intersection of Two Arrays
function intersection(nums1: number[], nums2: number[]): number[] {
    let res:number[] = [];
        
    // order the arrays
    nums1.sort((a, b) => a - b);
    nums2.sort((a, b) => a - b);
    
    let o = 0, t = 0;
    // iterate until reach the end of shortest array
    while((nums1[o] && nums2[t]) !== undefined) {
        // NOTE: the !== undefined is necessary, WHY
        // Bcuz, false !== undefined, so when we get out of bounds
        // it doesn't trigger a fail like we would want/expect
        const one = nums1[o], two = nums2[t];
        
        // found intersection
        if(one === two) {
            res.push(one);
            while(one === nums1[o]) o++;
            while(two === nums2[t]) t++;
            continue;
        }
        
        // iterate appropriately
        if(one > two) {
            while(two === nums2[t]) t++;
        } else {
            while(one === nums1[o]) o++;
        }
          
    }
    
    return res;
};

// 362. Design Hit Counter
class HitCounter {
    hitMap:Map<number, number>; // FIFO

    constructor() {
        this.hitMap = new Map();
    }

    hit(timestamp: number): void {
        if(this.hitMap.has(timestamp)) {
            const val = this.hitMap.get(timestamp) + 1;
            this.hitMap.set(timestamp, val);
        } else {
            this.hitMap.set(timestamp, 1);
        }
    }

    // return for last 5m (300s)
    getHits(timestamp: number): number {
        let pairs = this.hitMap.entries();
        let p = pairs.next().value;
        let hits = 0;
        while(p) {
            const diff = timestamp - p[0];
            
            if(diff < 300) {
                hits += p[1];
            }
            
            p = pairs.next().value;
        } 
        
        return hits;
    }
}

// 704. Binary Search
function search(nums: number[], target: number): number {

    let right = nums.length - 1;
    let left = 0;
    
    while(right >= left) {
        const mid = left + ~~((right - left) / 2)
        // console.log("mid ", mid)
        if (nums[mid] === target) {
            return mid;
        }
        
        if(nums[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    return -1;
};

// 1539. Kth Missing Positive Number
// NOTE: 0 is an integer
function findKthPositive(arr: number[], k: number): number {
    
    let left = 0, right = arr.length - 1;
    
    // find range in array where the missing int should be
    while(right >= left) {
        
        const mid = left + ~~((right-left) / 2); 
        
        // # of positive ints missing from this point
        const diff = arr[mid] - mid - 1;
        
        if (diff < k) { // keep going right
            left = mid + 1;
        } else { // go left
            right = mid - 1;
        }
    }
    
    // left index + amount of missing numbers = win
    return left + k;
};

// 1011. Capacity To Ship Packages Within D Days
// find ship weight limit needed for given days
function shipWithinDays(weights: number[], days: number): number {
    
    // count days needed for given weight limit
    const daysForLimit = (limit:number):number => {
        let day = 1,
            total = 0; 
        
        for(let i = 0; i < weights.length; i++) {
            total += weights[i];

            if(total > limit) { // reached capacity
                total = weights[i]; // put weight on next ship
                day++;
            }
        }
		
		return day; 
    }
    
    let low:number = Math.max(...weights), 
        high:number = weights.reduce((a, b) => a+b);
    
    // binary search for ideal weight
	// NOTE: not dealing with indexes
		// so (low <= high) gives infinite loop
		// (low < high) gets you to out of the loop
    while(low < high) {
        const mid:number = ~~((high+low) / 2);
        // console.log("mid: ", mid);
        if(daysForLimit(mid) > days) { // too many days
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    
    return low;
};

// 287. Find the Duplicate Number
function findDuplicate(nums: number[]): number {
    let left:number = 0, 
        right:number = nums.length - 1;
    
    let dupe:number = -1;
    
    while(left <= right) {
        const mid:number = ~~((left+right)/2);
        let count:number = 0;
        
        for (const num of nums) {
            if(num <= mid) {
                count++;
            }
        }
        
        if(count > mid) {
            dupe = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
        
    }
    
    return dupe;
};