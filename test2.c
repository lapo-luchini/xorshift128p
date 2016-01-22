// fetch http://xorshift.di.unimi.it/xorshift128plus.c
// cc -std=c99 test2.c -o test2
// ./test > a
// node test2 > b
// diff -u a b

#include <stdio.h>
#include "xorshift128plus.c"

int main() {
    s[0] = 1;
    printf("%016lx\n", next());
    printf("%016lx\n", next());
    printf("%016lx\n", next());
    jump();
    printf("%016lx\n", next());
    printf("%016lx\n", next());
    printf("%016lx\n", next());
    jump();
    printf("%016lx\n", next());
    printf("%016lx\n", next());
    printf("%016lx\n", next());
}
