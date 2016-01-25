var XorShift128p = require('../xorshift128p');

process.stdout.on('error', function (err) {
    // stop when output pipe is closed
    process.exit(1);
});

var r = new XorShift128p(1);
r.jump();
for (var i = 0; i < 10; ++i)
    process.stdout.write(r.nextFloat() + '\n');
var d = new Uint32Array(1000);
for (i = 0; i < 1000000; ++i)
    ++d[0|(r.nextFloat() * 1000)];
var min = 1E99, max = 0;
for (i = 0; i < 1000; ++i) {
    if (d[i] < min) min = d[i];
    if (d[i] > max) max = d[i];
}
process.stdout.write('Min bucket: ' + min + '\n');
process.stdout.write('Max bucket: ' + max + '\n');
