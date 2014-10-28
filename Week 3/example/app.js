var LineNumbering = require('./LineNumbering.js'),
    fs = require('fs');

fs.readFile('./resources/textfile.txt', null, function(err, data) {
    if(err) {throw err};
    var text = data.toString();

    var lineNumbering= new LineNumbering();

    console.log(lineNumbering.reader(text));
});

var start = new Date;
//setTimeout wachtend op de event queue
setTimeout(function () {
    var end = new Date;
    console.log('Verlopen tijd:', end - start, 'ms');
}, 500);

while (new Date - start < 1000) { };

