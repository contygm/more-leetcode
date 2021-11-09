# Two Pointers Notes

## Two Pointer Types
| Type | Description |
| --- | --- |
| Fast & Slow Pointer | Both pointers start at the same place, BUT the fast pointer's position moves faster through the array. Good for finding cycles and midpoints.  |
| Opposite Ends (Left+Right) | These pointers start at opposite ends of the structure. Good for comparisions and swapping. |

*Fast & Slow Pointer Example*

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

*Left + Right Pointer Example*

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
