/**
 * Created by Tomas on 16/10/14.
 */
var fs = require('fs'),
    http = require('http'),
    server = http.createServer(function(req, res) {

        res.on('error', function(err) {
            console.log(err);
        });
        var readStream = fs.createReadStream('./assets/video.mp4');
        res.writeHead(200, {'Content-type':'video/mp4','Transfer-Encoding':'chunked', 'Content-length':'20000000000000000'});
        readStream.pipe(res);
        res.on('data',function(data) {
            res.write(data);
        });



    }).listen(8080, 'localhost');