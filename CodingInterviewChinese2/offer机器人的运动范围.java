package Practice.LeetCode;

import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;

public class offer机器人的运动范围 {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int m = in.nextInt();
        int n = in.nextInt();
        int k = in.nextInt();
        in.close();
        System.out.println(movingCount(m, n, k));
    }
    /*
    public int movingCount(int m, int n, int k) {
        if (k == 0)
            return 1;
        int[][] map = new int[m][n];
        int res = dfs(map, 0, 0, k);

        return res;
    }

    int dfs(int[][] map, int i, int j, int k) {
        int count = 0;
        if (i >= 0 && j >= 0 && i < map.length && j < map[0].length && checkNum(i, j, k) && map[i][j] != 1) {
            map[i][j] = 1;
            count = 1 + dfs(map, i + 1, j, k) + dfs(map, i, j + 1, k);
        }
        return count;
    }
*/
    public static boolean checkNum(int i, int j, int k) {
        int sum = 0;
        while(i > 0) {
            sum += i % 10;
            i /= 10 ;
        }
        while (j > 0) {
            sum += j % 10;
            j /= 10;
        }
        if(sum <= k) 
            return true;
        return false;
    }

    public static int movingCount(int m, int n, int k) {
        if (k == 0)
            return 1;
        int[][] map = new int[m][n];
        Queue<int[]> que = new LinkedList<>();
        que.offer(new int[]{0,0});
        int res = 0;
        while (!que.isEmpty()) {
            int[] location = que.poll();
            int i = location[0];
            int j = location[1];
            if(i >= m || j >= n || map[i][j] == 1 || !checkNum(i, j, k)) {
                continue;
            }
            res++;
            map[i][j] = 1;
            que.offer(new int[] {i+1, j});
            que.offer(new int[] {i, j+1});
        }
        return res;
    }
}