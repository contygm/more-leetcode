# Two Pointers Notes

## Two Pointer Types
| Type | Description |
| --- | --- |
| Fast & Slow Pointer | Both pointers start at the same place, BUT the fast pointer's position moves faster through the array. <br> **Good for:** finding cycles and midpoints.  |
| Opposite Ends (Left+Right) | These pointers start at opposite ends of the structure. <br> **Good for:** comparisions and swapping |
| Sliding Window | **Good for:** longest subarray |


<details>
  <summary> Fast & Slow Pointer Example </summary>

```js

// find the mid point of a singlely linked list

function middleNode(head) {
    let slow = fast = head; 
    
    while( fast != null && fast.next != null ) {
        slow = slow.next;
		// will get to the end 2x as fast
        fast = fast.next.next;
    }
    
    return slow;
};

```

</details>

<details>
  <summary>Left + Right Pointer Example</summary>
  
  ```js
function isPalindrome(str) {
	let left = 0,
		right = str.length - 1;

	while(left < right) {
		if(str[left] !== str[right]) {
            return false
        }

		left++;
		right--;
	}
    
    return true;
}
```
</details>

<details>
  <summary>Sliding Window</summary>
  
  ```js
function name(var) {
	// code
}
```
</details>
