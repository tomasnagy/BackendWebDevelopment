
/**
 * Module dependencies.
 */

var express = require('express');
//var user = require('./routes/user');

var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: true
    }));



// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}





http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(http);

var homeRouter = require('./routes/indexRouter')(app),
    userRouter = require('./routes/userRouter')(app),
    imageRouter = require('./routes/imageRouter')(app, io);
