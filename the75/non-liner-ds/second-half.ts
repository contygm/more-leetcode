// 105. Construct Binary Tree from Preorder and Inorder Traversal
//  construct and return the binary tree.
// Given two integer arrays preorder and inorder where preorder is the preorder traversal 
// of a binary tree and inorder is the inorder traversal of the same tree

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if(preorder.length < 1 || inorder.length < 1) {
        return null;
    }

    const root: TreeNode = new TreeNode(preorder[0]);
    const rootIndex: number = inorder.indexOf(preorder[0]);
    
    root.left = buildTree(preorder.slice(1), inorder.slice(0, rootIndex));
    root.right = buildTree(preorder.slice(rootIndex+1), inorder.slice(rootIndex + 1));
    
    return root; 
};

// 347. Top K Frequent Elements
// Given an integer array nums and an integer k, return the 
// k most frequent elements. You may return the answer in any order.
function topKFrequent(nums: number[], k: number): number[] {
    
    let hashMap: Map<number, number> = new Map();
    // build hashMap for count of numbers
    for(const num of nums) {
        if(hashMap.has(num)) {
            hashMap.set(num, hashMap.get(num)+1);
        } else {
            hashMap.set(num, 1);
        }
    }
    
    const sortedHash = new Map([...hashMap.entries()].sort((a, b) => {
        if(a[1] === b[1]) {
            return a[0] - b[0];
        } 
        
        return b[1] - a[1];
    }));
    // console.log(sortedHash)

    let result: number[] = [];
    for (const key of sortedHash.keys()) {
        if(k === 0) {
          break;
        }
        
        k--;
        result.push(key);   
    }
    
    return result;
};