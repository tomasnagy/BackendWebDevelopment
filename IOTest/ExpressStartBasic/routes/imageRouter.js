/**
 * Created by tomasnagy on 20/11/14.
 */
module.exports = function(app, io) {
    app.get('/image', function(req, res) {
       res.render('images/image', {title: "Images"});
        io.sockets.on('connection', function(socket) {
            socket.on('clientMessage', function (data) {
                socket.emit('serverMessage', 'The client said: ' + data);
            });
        });
    });
}