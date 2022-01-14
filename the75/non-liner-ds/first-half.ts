
// Definition for a binary tree node.
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}
 
// 98. Validate Binary Search Tree
// Given the root of a binary tree, determine if it is a valid binary search tree (BST).
function isValidBST(root: TreeNode | null): boolean {
	return validate(root, null, null);
};
 
function validate(node: TreeNode | null, low: number | null, high: number | null): boolean {
	if(!node) {
		return true;
	}
	
	// need to use !== null cuz 
	// low/high === 0 can mess up the if's true/false
	if((low !== null && low >= node.val) ||
		(high !== null && high <= node.val)) {
		return false;   
	}
	
	return validate(node.left, low, node.val) && 
		validate(node.right, node.val, high);
}

// 226. Invert Binary Tree
// Given the root of a binary tree, invert the tree, and return its root.
function invertTree(root: TreeNode | null): TreeNode | null {
    if(!root) return root;
    
    const left = invertTree(root.left);
    const right = invertTree(root.right);
    root.left = right;
    root.right = left;
     
    return root;
}; 

// 435. Non-overlapping Intervals
// return the minimum number of intervals you need 
// to remove to make the rest of the intervals non-overlapping.
function eraseOverlapIntervals(intervals: number[][]): number {
    
    // sort by end
    intervals.sort((a, b) => a[1] - b[1]);
    
    let prevEnd = intervals[0][1];
    let count = 1;  // count non-overlapping intervals
    
    for(let i = 1; i < intervals.length; i++) {
        if(intervals[i][0] >= prevEnd) {
            prevEnd = intervals[i][1];
            count++;
        }
    }
    return intervals.length - count;
};