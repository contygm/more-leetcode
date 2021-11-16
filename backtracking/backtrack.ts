
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
            backtrack(next, path);
            path.pop();
        }
    }
    
    backtrack(0, [0]);
    return results;
    
};