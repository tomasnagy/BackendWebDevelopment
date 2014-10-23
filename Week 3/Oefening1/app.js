var fs = require('fs'),
    EventEmitter = require('events').EventEmitter,
    util = require('util');

function FileReader(filename) {
    var self = this;

    EventEmitter.call(self);

    fs.exists(filename, function(exists) {
        if(exists) {self.emit('stats');}
    });

    self.on('stats', function() {

    });
}

util.inherits(FileReader, EventEmitter);
