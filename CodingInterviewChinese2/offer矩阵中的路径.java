package Algorithms.CodingInterviewChinese2;

import java.util.Scanner;

/**
 * offer-矩阵中的路径
 */
public class offer矩阵中的路径 {
  public static void main(String[] args) {
    // Scanner in = new Scanner(System.in);
    // exist()
  }

  int[][] go = { { 1, -1, 0, 0 }, { 0, 0, 1, -1 } };

  boolean DFS(char[][] board, char[] str, int i, int j, int k) {
    if (i < 0 || j < 0 || i >= board.length || j >= board[0].length || board[i][j] != str[k])
      return false;

    if (k == str.length - 1)
      return true;

    char temp = str[k];
    board[i][j] = '.';
    for (int p = 0; p < 4; p++) {
      if (DFS(board, str, i + go[0][p], j + go[1][p], k + 1))
        return true;
    }
    board[i][j] = temp;
    return false;
  }

  public boolean exist(char[][] board, String word) {

    int rowNum = board.length;
    int colNum = board[0].length;
    char[] str = word.toCharArray();

    for (int i = 0; i < rowNum; i++) {
      for (int j = 0; j < colNum; j++) {
        if (board[i][j] == str[0]) {
          if (DFS(board, str, i, j, 0))
            return true;
        }
      }
    }
    return false;
  }
}