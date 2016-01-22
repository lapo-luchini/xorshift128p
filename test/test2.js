var XorShift128p = require('../xorshift128p');

process.stdout.on('error', function (err) {
    // stop when output pipe is closed
    process.exit(1);
});

function hex32(i) { return ('0000000' + i.toString(16)).slice(-8); }
function hex64(i) { return hex32(i[0]) + hex32(i[1]); }

var r = new XorShift128p(1);
for (var i = 0; i < 3; ++i)
    process.stdout.write(hex64(r.next()) + '\n');
r.jump();
for (var i = 0; i < 3; ++i)
    process.stdout.write(hex64(r.next()) + '\n');
r.jump();
for (var i = 0; i < 3; ++i)
    process.stdout.write(hex64(r.next()) + '\n');
