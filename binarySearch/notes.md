# Binary search notes

## Basic Algo
```js
function search(nums: number[], target: number): number {

    let right = nums.length - 1;
    let left = 0;
    
    while(left >= right) { 
		// floor for whole number
        // NOTE: both version of mid will work
        //  - they are equivalent
        // const mid = low + ~~((high-low)/2); 
        const mid = ~~((high+low)/2);

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

### Prefix Sum

**A prefix sum is the sum of all the previous numbers plus the current number.**

>Example: 
`original = [2, 4, 6, 8]` becomes `new = [2, 6, 12, 20]`

*Example Problem (based on `528`):*

Given an array of `weights`, create a function that will pick a random weight such that the probability of picking `weights[i]` is equal to `weights[i] / sumOfAllWeights`. Return the index of `weights[i]`.

*Answer:* Create a new prefix sum array. Choose a random number between 0 and the `sumOfAllWeights`. Find the index of the number that is greater than the random number. The prefix sum array will proportionally adjust the chances of picking `weights[i]` such that the probability of picking it is `weights[i] / sumOfAllWeights`. 
