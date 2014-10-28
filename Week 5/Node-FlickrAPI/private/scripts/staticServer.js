/**
 * Created by tomasnagy on 23/10/14.
 */
var staticServer = function () {
    var http = require('http'),
        router = require('./router.js'),
        path = require('path'),
        httpListen = function (httpPort) {
            var server = http.createServer(function (req, res) {

                router.init(req.url, function (err, data, isData) {

                    if(!err) {
                        //check if data is jsonarray
                        if(isData) {
                            // return apidata
                            sendJson(data, res);
                        } else {
                            // data is always text
                            readFile(data, path.extname(req.url), res);
                        }

                    }
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
        sendJson = function(data, res) {
            res.writeHead(200, {'Content-type': 'application/json'})
            res.end(JSON.stringify(data));
        }
        init = function (httpPort) {
            httpListen(httpPort);
        };
    return {
        init: init
    };
}();

module.exports = staticServer;
