/**
 * Created by tomasnagy on 23/10/14.
 */
var staticServer = function () {
    var http = require('http'),
        path = require('path'),
        fs = require('fs'),
        httpListen = function (httpPort) {
            var server = http.createServer(function (req, res) {

                var filename = path.basename(req.url) || 'index.html';
                readFile(res, filename);

            }).listen(httpPort, 'localhost');
        },
    extensions = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "application/javascript",
        ".png": "image/png",
        ".gif": "image/gif",
        ".jpg": "image/jpeg"
    },
    localMaps = {
        '.html': '/public/',
        '.css': '/public/css/',
        '.js' : '/public/scripts/'
    },
    readFile = function (res, filename) {

        var ext = path.extname(filename),
        localPath = process.cwd() + localMaps[ext] + filename;
        console.log(localPath);
        fs.exists(localPath, function (exists) {
            console.log(exists);
            if (exists) {
                fs.readFile(localPath, function (err, contents) {
                    if (err) {
                        res.writeHead(404);
                        res.end();
                    } else {
                        res.writeHead(200, {'Content-type': extensions[ext]});
                        res.end(contents);
                    }
                });
            }
        });
    },
    init = function (httpPort) {
        console.log("server running on port :", httpPort);
        httpListen(httpPort);
    };
    return {
        init : init
    };
}();

module.exports = staticServer;
