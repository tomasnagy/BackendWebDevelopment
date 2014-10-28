/**
 * Created by Tomas on 16/10/14.
 */
var Readable = require('stream').Readable,
    rs = Readable({encoding: 'utf8'}),
    fs = require('fs');

rs.push('Het alfabet: \n');

for (var i = 97; i < 'z'.charCodeAt(0); i++) {
    rs.push(String.fromCharCode(i));
}

rs.push(null);

// write data to file
var writeable = fs.createWriteStream('./docs/alfabet.txt');

rs.pipe(writeable).on('close', function () {
    console.log('written');
});


rs.on('data', function (data) {
    console.log(data);
});

rs.on('error', function (err) {
    console.log(err);
});

rs.on('end', function () {
    console.log('Dit was het alfabet.');
})


setTimeout(function () {
    process.exit()
}, 20000);