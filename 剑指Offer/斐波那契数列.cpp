#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

ll fib(unsigned n){
    int res[2] = {0,1};
    if(n < 2) return res[n];
    ll fib1 = 0;
    ll fib2 = 1;
    ll fibN = 0;
    for(int i = 2; i <= n; i++){
        fibN = (fib1 + fib2) % 1000000007;
        fib1 = fib2;
        fib2 = fibN;
    }
    return fibN ;
}

int main(){
    int n;
    while(scanf("%d", &n)){
        printf("%lld\n",fib(n));
    }
}