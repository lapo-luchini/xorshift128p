var XorShift128p = require('./xorshift128p');

process.stdout.on('error', function (err) {
    // stop when output pipe is closed
    process.exit(1);
});

function hex32(i) {
    return ('0000000' + i.toString(16)).slice(-8);
}

var r = new XorShift128p(1);

for (var i = 0; i < 1000000; ++i) {
    var out = r.next();
    process.stdout.write(hex32(out[0]) + hex32(out[1]) + '\n');
}
