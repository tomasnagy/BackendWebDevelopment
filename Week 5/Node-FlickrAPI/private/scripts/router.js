/**
 * Created by tomasnagy on 23/10/14.
 */


var domain = require('domain'),
    routerDomain = domain.create();

routerDomain.on('error', function (err) {
    console.log('router error: ' + err);
});

routerDomain.run(function() {

    var router = function () {
        var path = require('path'),
            fs = require('fs'),
            url = require('url'),
            apiData = require('./getAPIData.js')
        routeAllTheThings = function (fullUrl, callback) {
            var parsedUrl = url.parse(fullUrl);
            if (parsedUrl.pathname === '/apiData') {
                //dostuff
                var term = parsedUrl.query.split('=')[1];
                console.log('term ' + term);
                apiData.callAPI(term, function (data) {
                    callback(null, data, true);
                });
            } else {
                // file should be one of the types specified in server extensions
                if (parsedUrl.pathname === '/') {
                    parsedUrl.pathname = '/index.html';
                }
                readFile(parsedUrl.pathname, function (err, data) {
                    if (callback && typeof(callback) === "function") {
                        callback(err, data);
                    }
                });
            }


        },
            localMaps = {
                '.html': '/public/',
                '.css': '/public/css/',
                '.map': '/public/css',
                '.js': '/public/scripts/',
                '.ico': '/public/assets/images/'
            },
            readFile = function (filename, callback) {
                var ext = path.extname(filename),
                    localPath = process.cwd() + localMaps[ext] + filename;

                fs.exists(localPath, function (exists) {
                    if (exists) {
                        fs.readFile(localPath, function (err, contents) {
                            if (err) {
                                return err;
                            } else {
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

});

