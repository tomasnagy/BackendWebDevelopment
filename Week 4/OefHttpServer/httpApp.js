/**
 * Created by Tomas on 16/10/14.
 */
var http = require('http'),
    server = http.createServer(function(req, res) {
        res.writeHead(200, {'Content-type':'text/plain'})
        res.end('Hello world \n');

    });

server.listen(8080, function() {

});

console.log('Server running on port 8080');