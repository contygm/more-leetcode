so, it's just a modified DFS
tends to be recursive, like DFS

look for words like: permutation

```js
function backtrack(index: number, path: number[], list: number[]) {

	// ... if hit target
	
	for(let i = index; i < list.length; i++)  {
		path.push(list[i]); 
		backtrack(list[i], path); // explore depth
		path.pop(); // back track last (aka current next)
	}
	
	// ... return what's appropriate for the problem
}
```