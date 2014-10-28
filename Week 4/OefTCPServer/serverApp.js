/**
 * Created by Tomas on 16/10/14.
 */
var net = require('net'),
    sockets = [],
    server = net.createServer({
            allowHalfOpen: true
        },
        //3. Connection listener
        function (socket) {
            //elke binnenkomende connectie verwerken
            console.log("server heeft nieuwe connectie");

            sockets.push(socket);

            socket.setEncoding('utf8');
            socket.write("Dit is een customised boodschap voor de client.")
            socket.on("data", function (data) {
                //ontvangst van browser headers of van TCP cliënt data.
                if (data) {
                    console.log("ontvangen data: " + data)
                    if(data.toString().trim()  === 'quit') {
                        socket.write("Disconnected");
                        sockets.splice(sockets.indexOf(socket, 1));
                        return socket.end();
                    }
                }

                sockets.forEach(function(s) {
                    if(socket !== s)
                        s.write(data);
                });

                //return socket.end();
            });
            //socket.on("end", function (data) {
            //    sockets.splice(sockets.indexOf(socket, 1));
            //    console.log("Goodbye. Client connectie is beëindigd.");
            //});

        })
//2. TCP server luistert naar poort 1337 (listening listener)
server.listen(1337, function () {
    console.log("luisteren naar poort" + server.address().port);
    // server.close();
});
//4. error handling
server.on("error", function (error) {
    if (error.code === "EADDRINUSE") {
        console.log("Deze poort is reeds in gebruik");
    } else {
        console.log("Fout" + error.message);
    }
});


