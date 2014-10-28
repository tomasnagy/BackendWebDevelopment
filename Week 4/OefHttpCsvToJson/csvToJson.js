/**
 * Created by Tomas on 16/10/14.
 */
var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    util = require('util'),
    server = http.createServer(function (req, res) {

        var file;
        console.log(req.url);

        var splitUrl = req.url.split('.');
        var extension = splitUrl[splitUrl.length - 1];
        console.log(extension);

        if (req.url === '/data') {
            file = '.' + path.normalize('/data/file.csv');
            if (file !== undefined) {
                fs.readFile(file, 'utf8', function (err, data) {
                    if (err !== null)
                        console.log('Error: ' + err);
                    var obj = {};

                    var lines = data.split('\n');

                    lines.forEach(function (line) {
                        var parts = line.split(';');
                        obj['Hoofdstuk ' + parts[0]] = parts[1];
                    });

                    res.writeHead(200, {'Content-type': 'application/json'});
                    res.write(JSON.stringify(obj));
                    res.end();
                })
            }

        } else if(req.url === '/site') {
            file = '.' + path.normalize('/data/index.html');
            fs.readFile(file, 'utf8', function(err, data) {
                console.log('Error: ' + err);

                res.writeHead(200, {'Content-type': 'text/html'});
                res.write(data);
                res.end();
            });
        } else if(req.url.split('.')[1] === 'css') {
            file = '.' + path.normalize('/data/' + req.url.split('.')[0] + '.css');
            fs.readFile(file, function(err, data) {
               res.writeHead(200, {'Content-type': 'text/css'});
                res.write(data);
                res.end();
            });

        }
        //else if(extension === 'css') {
        //    fs.readFile('./screen.css', 'utf8', function(err, data) {
        //       res.writeHead(200, {'Content-type': 'text/css'});
        //        res.write(data);
        //       // res.end();
        //    });
        //}


    }).listen(1337, 'localhost');