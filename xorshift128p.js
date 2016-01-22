/*! xorshift128+ JavaScript port
 * written in 2016 by Lapo Luchini <lapo@lapo.it>
 *
 * based on the C sources as found on 2016-01-22 on
 * <http://xorshift.di.unimi.it/xorshift128plus.c>
 *
 * Written in 2014-2015 by Sebastiano Vigna (vigna@acm.org)
 *
 * To the extent possible under law, the author has dedicated all copyright
 * and related and neighboring rights to this software to the public domain
 * worldwide. This software is distributed without any warranty.
 *
 * See <http://creativecommons.org/publicdomain/zero/1.0/>.
 */

/*jshint browser: true, strict: true, immed: true, latedef: true, undef: false */
(function () {
"use strict";

var j = new Uint32Array(4); // jump constant
j[0] = 0x635d2dff;
j[1] = 0x8a5cd789;
j[2] = 0x5c472f96;
j[3] = 0x121fd215;

function XorShift128p(seed) {
    var s = new Uint32Array(4), // seed
        t = new Uint32Array(4), // temp
        o = new Uint32Array(2); // out
    // The state must be seeded so that it is not everywhere zero.
    this.seed = function (seed) {
        s[0] = seed / 4294967296;
        s[1] = seed;
    };
    if (seed)
        this.seed(seed);
    this.next = function () {
        // uint64_t s1 = s[0];
        t[2] = s[0];
        t[3] = s[1];
        // const uint64_t s0 = s[1];
        t[0] = s[2];
        t[1] = s[3];
        // s[0] = s0;
        s[0] = t[0];
        s[1] = t[1];
        // s1 ^= s1 << 23;
        o[0] = (t[2] << 23) | (t[3] >>> 9);
        o[1] = t[3] << 23;
        t[2] ^= o[0];
        t[3] ^= o[1];
        // s[1] = s1
        s[2] = t[2];
        s[3] = t[3];
        // s[1] ^= s0
        s[2] ^= t[0];
        s[3] ^= t[1];
        // s[1] ^= (s1 >> 18)
        s[2] ^= t[2] >>> 18;
        s[3] ^= (t[2] << 14) | (t[3] >>> 18);
        // s[1] ^= (s0 >> 5);
        s[2] ^= t[0] >>> 5;
        s[3] ^= (t[0] << 27) | (t[1] >>> 5);
        // return s[1] + s0;
        o[0] = s[2] + t[0];
        o[1] = s[3] + t[1];
        if (o[1] < t[1]) ++o[0];
        return o;
    };
    // This is the jump function for the generator. It is equivalent
    // to 2^64 calls to next(); it can be used to generate 2^64
    // non-overlapping subsequences for parallel computations.
    this.jump = function () {
        var l = new Uint32Array(4); // local temp
        l[0] = 0;
        l[1] = 0;
        l[2] = 0;
        l[3] = 0;
        for (var i = 0; i < 4; ++i)
            for (var b = 0; b < 32; ++b) {
                if (j[i] & (1 << b)) {
                    l[0] ^= s[0];
                    l[1] ^= s[1];
                    l[2] ^= s[2];
                    l[3] ^= s[3];
                }
                this.next();
            }
        s[0] = l[0];
        s[1] = l[1];
        s[2] = l[2];
        s[3] = l[3];
    };
}

// export globals
if (typeof module !== 'undefined') { module.exports = XorShift128p; } else { window.XorShift128p = XorShift128p; }
})();
