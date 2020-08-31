package Algorithms.Other;

import java.util.Scanner;

public class numberOf1 {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        while(in.hasNext()) {
            int n = in.nextInt();
            int[] ans = CountBitN(n);
            for (int i : ans) {
                System.out.println(i);
            }
        }
        in.close();
    }

    public static int[] CountBitN(int num) {
        int[] res = new int[num + 1];
        int pow2 = 1;
        int before = 1;
        for (int i = 1; i <= num; i++) {
            if (i == pow2) {
                res[i] = 1;
                before = pow2;
                pow2 <<= 1;
                // System.out.println(res[i]);
            } else {
                res[i] = res[i - before] + 1;
                // System.out.println(res[i]);
            }
        }
        return res;
    }
}