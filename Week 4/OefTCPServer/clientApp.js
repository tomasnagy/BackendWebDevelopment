/**
 * Created by Tomas on 16/10/14.
 */
var net = require('net'),
    client = net.connect(1337, 'localhost', function() {
        console.log("client maakt verbinding");
        //3. client (connectie) is een stream en kan dus read/write methodes uitvoeren
        client.write("User has entered your channel \n");
    });

process.stdin.on('data', function(data) {
    //console.log(err);

    if(data.toString().trim() === 'quit')
        client.end();
    else {
        client.write(data);
    }
});

client.on('close', function() {
    console.log('reconnecting');
    reconnect();
})

function reconnect() {
    connect();
}

client.pipe(process.stdout);

setTimeout(function(){ process.exit() }, 4020340);