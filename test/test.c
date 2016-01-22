// fetch http://xorshift.di.unimi.it/xorshift128plus.c
// cc -std=c99 test.c -o test
// ./test > a
// node test > b
// diff -u a b

#include <stdio.h>
#include "xorshift128plus.c"

int main() {
    s[0] = 1;
    for(int i = 0; i < 1000000; ++i)
        printf("%016lx\n", next());
}
