/**
 * Created by tomasnagy on 20/11/14.
 */
var socket = io.connect('http://localhost:3000');
socket.emit('clientMessage','Hello from client');
socket.on('serverMessage', function(data) {
    document.write('server says: ' + data);
})