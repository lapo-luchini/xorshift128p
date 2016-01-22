var XorShift128p = require('../xorshift128p');

process.stdout.on('error', function (err) {
    // stop when output pipe is closed
    process.exit(1);
});

function hex32(i) { return ('0000000' + i.toString(16)).slice(-8); }
function hex64(i) { return hex32(i[0]) + hex32(i[1]); }

var t0 = Date.now();
    r = new XorShift128p(1);
for (var i = 0; i < 9999995; ++i)
    r.next();
var t1 = Date.now();
process.stdout.write((t1 - t0) + ' ms\n');

for (var i = 0; i < 5; ++i)
    process.stdout.write(hex64(r.next()) + '\n');
