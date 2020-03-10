/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} t
 * @param {number} target
 * @return {number}
 */
var frogPosition = function(n, edges, t, target) {
    var G = new Array(n + 1);
    for(let i = 0; i <= n; i++){
        G[i] = new Array(n + 1).fill(-1);
    }
    var vis = new Array(n + 1).fill(0);
    
    for(let i = 0; i < edges.length; i++){
      G[edges[i][0]][edges[i][1]] = 1;
    }
    
    var res = [];

    function dfs(u, depth){
        vis[u] = 1;
        res.push(u);
        for(let v = 1; v <= n; v++){
          if (vis[v] == 0 && G[u][v] != -1 && depth < t){
            if (v == target) break;
            dfs(v, depth + 1);
            vis[v] = 0;
            depth--;
            res.pop();
          }
        }
        return ;
    }
    dfs(1,0);
    console.log(res);
    console.log(G, vis);
};
var n = 7;
var edges = [
    [1, 2],
    [1, 3],
    [1, 7],
    [2, 4],
    [2, 6],
    [3, 5]
  ];
var t = 3;
var target = 4;
frogPosition(n, edges,t, target);
