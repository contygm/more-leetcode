
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