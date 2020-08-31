package Algorithms.CodingInterviewChinese2;

import java.util.Scanner;

public class offer剪绳子 {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int length = in.nextInt();
        in.close();
        System.out.println(MaxProductAfterCut_QuickPow(length));
    }

    public static int MaxProductAfterCut(int n) {
        if (n < 2)
            return 0;
        if (n == 2)
            return 1;
        if (n == 3)
            return 2;
        int[] products = new int[n + 1];
        products[0] = 0;
        products[1] = 1;
        products[2] = 2;
        products[3] = 3; // n == 4 的时候 分为 1+3，3再切乘积就变小了，所以初始化为3
        int max = 0;
        for (int i = 4; i <= n; i++) {
            max = 0;
            for (int j = 0; j <= i / 2; j++) {
                int product = products[j] * products[i - j];
                System.out.println(product);
                if (product > max)
                    max = product;
                products[i] = max;
            }
        }

        return products[n];
    }

    /*
     * 第二题：总体条件不变，但最后结果需要取余，这时候动态规划就有问题了。取余之后max函数就不能用来比大小了。
     * 
     * 这里用的贪心，
     */
    public static int MaxProductAfterCut_2(int n) {
        if (n < 4)
            return n - 1;
        long res = 1;
        int p = 1000000007;
        while (n > 4) {
            n -= 3;
            res = res * 3 % p;

        }
        return (int) (res * n % p);
    }
    /**
     * 贪心加上快速幂取余
     * 
     * @param n
     * @return
    */
    public static int MaxProductAfterCut_QuickPow(int n) {
        if (n < 4)
            return n - 1;
        int cnt = n / 3, p = (int)1e9 + 7;
        if(n % 3 == 0) {
            return (int)quickPow(3, cnt, p);
        }else if(n % 3 == 1) 
            return (int)(quickPow(3, cnt - 1, p) * 4 % p);
        return (int)(quickPow(3, cnt, p) * 2 % p);
    }

    public static long quickPow(long base, int cnt, int p) {
        long res = 1;
        while(cnt > 0) {
            if((cnt & 1) == 1) {
                res = res * base % p;
            }
            base = base * base % p;
            cnt >>= 1;
        }
        return res;
    }
}