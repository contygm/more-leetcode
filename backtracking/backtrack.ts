
// 797. All Paths From Source to Target
// example: graph = [ [1,2], [3], [3], [] ]
//          node =      0     1    2   3
function allPathsSourceTarget(graph: number[][]): number[][] {
      
    // based on index of last node
    const target: number = graph.length - 1;
    let results: number[][] = [];
    
    // recursive
    const backtrack = (currNode, path): void => {
        // hit target
        if (currNode === target) {
            results.push([...path]);
            return;
        }
        
        for (let next of graph[currNode]) {
            path.push(next); 
            backtrack(next, path); // explore depth
            path.pop(); // back track last (aka current next)
        }
    }
    
    backtrack(0, [0]);
    return results;
    
};

// 1863. Sum of All Subset XOR Totals
function subsetXORSum(nums: number[]): number {
    let total = 0;
    
	// NOTE: the ^ is for bitwise operations
    const backtrack = (index, sumSet): number => {
        total += sumSet.reduce((a, b) => a^b, 0); 
        
        for(let i = index; i < nums.length; i++) {
            sumSet.push(nums[i]);
            backtrack(i+1, sumSet);
            sumSet.pop();
        }
        
        return total;
    }
    
    return backtrack(0, []);
};

// 489. Robot Room Cleaner
function cleanRoom(robot: Robot) {
    
    // nifty turn around function
    const goBack = () => {
        // turn around
        robot.turnRight();
        robot.turnRight();
        robot.move();
        
        // turn in direction came from 
        robot.turnRight();
        robot.turnRight();
    }
    
    let visited = new Set();
    
    // clockwise => 0: 'up', 1: 'right', 2: 'down', 3: 'left'
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    
    const backtracking = (cell: number[], dir: number): void => {
        robot.clean();
        visited.add(cell.join());
        
        for(let i = 0; i < 4; i++) { // go thru clockwise
            // find next dir + cell
            const newDir = (dir + i) % 4;
            const newRow = cell[0] + directions[newDir][0];
            const newCol = cell[1] + directions[newDir][1];
            
            // move to next + backtrack cycle
            if( !visited.has([ newRow, newCol ] .join()) && robot.move() ) {
                backtracking([ newRow, newCol ] , newDir);
                goBack();
            }
            
            // only turn right to make things simpler
            robot.turnRight();
        }
    }
    
    backtracking([0, 0], 0);
};

// 46. Permutations
function permute(nums: number[]): number[][] {
    let results: number[][] = [];
    
    const swap = (l , r) => {
        const temp = nums[l];
        nums[l] = nums[r];
        nums[r] = temp;
    }
    
    const backtrack = ( firstIndex: number ): void => {
        if(firstIndex === nums.length) {
            results.push([...nums]);
            return;
        } 
    
        for(let i = firstIndex; i < nums.length; i++) {
            // swap
            swap(firstIndex, i);
            backtrack(firstIndex+1);
            
            // swap back
            swap(i, firstIndex);
        }
    }
    
    
    backtrack(0);
    return results;
};

// 22. Generate Parentheses
function generateParenthesis(n: number): string[] {
    
    let results: string[] = [];
    
    const backtrack = ( parens: string[], left:number, right:number ): void => {
        
        if( parens.length === 2*n) {
            results.push(parens.join(""));
            return;
        }
        
        if( left < n ) {
            parens.push("(");
            backtrack(parens, left+1, right);
            parens.pop();
        }
        
        if( right < left ) {
            parens.push(")");
            backtrack(parens, left, right+1);
            parens.pop();
        }
        
    }
    
    backtrack([], 0, 0);
    return results;
};

//526. Beautiful Arrangement
function countArrangement(n: number): number {
    // perm[i] / i % === 0 || i / perm[i] % === 0
    
    let count = 0;
  
    const backtrack = (place: number, visited: number[]) => {
        
        if (place > n) {
            count++;
        }
        
        for(let i = 1; i <= n; i++) {
            if( !visited.includes(i) &&
                ( place%i === 0 || i%place === 0 )
             ) {
                visited.push(i);
                backtrack( place + 1, [...visited]);
                visited.pop();
            }
        }
    }
    backtrack(1, []);
    return count;
};

// 78. Subsets
function subsets(nums: number[]): number[][] {
    let results: number[][] = [];
    const length = nums.length;
    
    const backtrack = (first:number, combo:number[]):void => {        
        if(combo.length === k) {
            results.push([...combo]);
            return;
        }
    
        for(let i = first; i < length; i++) {
            combo.push(nums[i]);
            backtrack(i+1, combo);
            combo.pop();
        }
        
    }

    let k;
    for(k = 0; k <= length; k++) {
        backtrack(0, []);
    }
    
    return results;
};

// 39. Combination Sum
function combinationSum(candidates: number[], target: number): number[][] {
    
    let results: number[][] = [];
    
    const backtracking = (first:number, combo:number[], diff: number):void => {
        if(diff === 0) { // reached target
            results.push([...combo]);
            return;
        } else if ( diff < 0 ) { // exceeded target
            return;
        }
        
        for(let i = first; i < candidates.length; i++) {
            combo.push(candidates[i]);
            // no i+1 cuz can repeat use of numbers
            backtracking(i, combo, diff - candidates[i]);
            combo.pop();
        }
        
    }
    
    backtracking(0, [], target);
    
    return results;
};

// 131. Palindrome Partitioning
function partition(s: string): string[][] {
    const isPalindrome = (str: string): boolean => {
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
    };
    
    let results:string[][] = [];
    
    const backtrack = (first:number, combo:string[] ): void => {
        if(first >= s.length) {
            results.push([...combo]);
            return;
        }
    
        for(let i = first; i < s.length; i++) {
            const subStr = s.substring(first, i+1);
            if(isPalindrome(subStr)) {
                combo.push(subStr);
                backtrack(i+1, combo);
                combo.pop();
            }
        }
    }
    
    backtrack(0, []);
    
    return results;
};

// 17. Letter Combinations of a Phone Number
function letterCombinations(digits: string): string[] {

    let result:string[] = [];
    
    const letters = {
        "2":"abc",
        "3":"def",
        "4":"ghi",
        "5":"jkl",
        "6":"mno",
        "7":"pqrs",
        "8":"tuv",
        "9":"wxyz"
    };
    
    const backtrack = (combo:string[], index:number) => {
        
        if(combo.length === digits.length) {
            result.push(combo.join(""));
            return;
        }
        
        // letters for corresponding digits
        const digitLetters = letters[digits[index]];
        console.log(digitLetters)
        
        for(let letter of digitLetters) {
            combo.push(letter);
            backtrack(combo, index+1);
            combo.pop();
        }
    };
    
    if(digits.length > 0) {
         backtrack([], 0);
    }
   
    return result;
};