/*var net = require('net');

var server = net.createServer(function(socket) {
    socket.write('Echo server\r\n');
    console.log('data sent!');
    socket.pipe(socket);
});

server.listen(1337, '127.0.0.1');
*/

var PORT = 11111;
var HOST = '192.168.0.35';

var data = '{' +
    '"id": "18:FE:34:D4:4E:43",' + //18fe34d457a //"} from 192.168.0.35:111
    '"area": 0,' +
    '"type": "rgb",' +
    '"mode": "color",' + // e.g. color / fade / pulse / rainbow_fade / rainbow_chase
    '"values": {' +
    '  "red": 80,' +
    '  "green": 0,' +
    '  "blue": 20' +
    '  }' +
    '}';

var dgram = require('dgram');
var message = new Buffer(data);

var client = dgram.createSocket('udp4');
client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST + ':' + PORT);

    var buff = new Buffer(bytes);
    console.log(buff.toString(undefined));
    client.close();
});


/*{"light": {
  "id": "18fe34d44e43",
  "area": "1",
  "type": "rgb",
  "values": [
    {"red": "255"},
    {"green": "0"},
    {"blue": "127"}
    ]
}}*/
