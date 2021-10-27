
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