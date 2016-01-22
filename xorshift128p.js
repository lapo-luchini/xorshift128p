function XorShift128p(seed) {
    var s = new Uint32Array(4), // seed
        t = new Uint32Array(4), // temp
        o = new Uint32Array(2); // out
    this.seed = function () {
        s[0] = seed / 4294967296;
        s[1] = seed;
    }
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
}

module.exports = XorShift128p;
