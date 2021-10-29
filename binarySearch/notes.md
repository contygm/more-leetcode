# Binary search notes

## Basic Algo
```js
function search(nums: number[], target: number): number {

    let right = nums.length - 1;
    let left = 0;
    
    while(left >= right) { 
		// floor for whole number
        const mid = left + ~~((right - left) / 2)

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
```
## Setup

### Either
```js
let right = nums.length - 1; // diff

...

while(left >= right) { // diff
	...
	if(...) {
		right = mid - 1; // diff
	} else {
		left = mid + 1;
	}
}
```

### Or

```js
let right = nums.length; // diff

...

while(left > right) { // diff
	...
	if(...) {
		right = mid; // diff
	} else {
		left = mid + 1;
	}
}
```

If *no values < `target`* , `right === -1`