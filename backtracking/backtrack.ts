
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