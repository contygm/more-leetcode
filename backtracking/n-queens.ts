
// 51. N-Queens
// Q = queen, . = empty space
// place N queens on an NxN board
// only 1 Q per row/col, same on diagonal probs
// diagonal = row - col
// anti-diagonal = row + col
function makeBoard(n:number):string[] {
    let board: string[] = [];
    for(let row = 0; row < n; row++) {
        let str = "";
        for(let col = 0; col < n; col++) { 
            str += ".";
        }
        board.push(str);
    }
    return board;
}

function placeQueen(row: number, col: number, board:string[]): string[] {
    const line = board[row];
    board[row] = line.substring(0, col) + 'Q' + line.substring(col + 1);           
	return board;
}

function removeQueen(row: number, col: number, board:string[]): string[] {
    const line = board[row];
    board[row] = line.substring(0, col) + '.' + line.substring(col + 1);  
    return board;
}

function solveNQueens(n: number): string[][] {
    
    let results:string[][] = [];
    
    const backtrackQueens = (row:number, cols:number[], diags:number[], antiDiags:number[], state:string[]) => {
    
        // found valid solution cuz reached last row
        if(row === n) {
            results.push([...state]);
            return;
        }
        
        for(let col = 0; col < n; col++){
			// calc diags
            const curDiag = row - col;
            const curAntiDiag = row + col; 

			// check if valid space
            if(!cols.includes(col) && 
               !diags.includes(curDiag) && 
               !antiDiags.includes(curAntiDiag)
            ) {
                // backtracking push
                cols.push(col);
                diags.push(curDiag);
                antiDiags.push(curAntiDiag);
                state = placeQueen(row, col, state);
                
                backtrackQueens(row+1, cols, diags, antiDiags, state);
                
                // backtracking pop
                state = removeQueen(row, col, state);
                cols.pop();
                diags.pop();
                antiDiags.pop();
            }
        }
    }
    
    // kick off
    let empty:string[] = makeBoard(n);
    backtrackQueens(0, [], [], [], empty);
    return results;
};

/*
Time complexity: O(N!)
For the first queen, you consider N spaces. For the next, N-2 spaces.
Then N-4 and so on. This is roughly N!. 

Space complexity: O(N^2)

The cols, diags, antiDiags arrays scale linearly 
but the state is board state is n^2
*/ 