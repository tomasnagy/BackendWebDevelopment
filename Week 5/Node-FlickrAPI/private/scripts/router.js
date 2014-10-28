/**
 * Created by tomasnagy on 23/10/14.
 */
var router = function () {
    var path = require('path'),
        fs = require('fs'),
        url =  require('url'),
        routeAllTheThings = function (fullUrl, callback) {
            console.log('fullurl: ' + fullUrl);
            var parsedUrl = url.parse(fullUrl);

            if(parsedUrl.href === '/apiData') {
                //dostuff
            } else {
                // file should be one of the types specified in server extensions
                readFile(parsedUrl.href, function (err, data) {
                    if (callback && typeof(callback) === "function") {
                        callback(err, data);
                    }
                });
            }


        },
        localMaps = {
            '.html': '/public/',
            '.css': '/public/css/',
            '.js': '/public/scripts/',
            '.ico': '/public/assets/images/'
        },
        readFile = function (filename, callback) {
            console.log('filename: ' + filename);
            var ext = path.extname(filename),
                localPath = process.cwd() + localMaps[ext] + filename;

            fs.exists(localPath, function (exists) {
                if (exists) {
                    fs.readFile(localPath, function (err, contents) {
                        if (err) {
                            console.log(err);
                            return err;
                        } else {
                            console.log('data OK: ' + contents);
                            if (callback && typeof(callback) === "function") {
                                callback(err, contents);
                            }
                        }
                    });
                }
            });
        },
        init = function (filename, callback) {
            routeAllTheThings(filename, callback);
        };
    return {
        init: init
    };
}();

module.exports = router;

