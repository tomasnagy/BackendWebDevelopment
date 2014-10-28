/**
 * Created by tomasnagy on 23/10/14.
 */
var staticServer = function () {
    var http = require('http'),
        router = require('./router.js'),
        path = require('path'),
        httpListen = function (httpPort) {
            var server = http.createServer(function (req, res) {

                router.init(req.url, function (err, data) {
                    if(!err)
                        readFile(data, path.extname(req.url), res);
                });

            }).listen(httpPort, 'localhost');
        },
        extensions = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.jpg': 'image/jpeg',
            '.ico': 'image/x-icon'
        },
        readFile = function (data, ext, res) {
            if (data != null) {
                res.writeHead(200, {'Content-type': extensions[ext]});
                res.end(data);
            }
        },
        init = function (httpPort) {
            httpListen(httpPort);
        };
    return {
        init: init
    };
}();

module.exports = staticServer;
