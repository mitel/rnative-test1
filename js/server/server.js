/**
 * Created by mitel on 01/05/15.
 */
/*eslint-disable*/
var Hapi = require('hapi');
var Tv = require('tv');
var routes = require('./routes/testroutes');
var server = new Hapi.Server({
    connections: {
        routes: {
            cors: {
                origin: ['*'],
                credentials: true,
                additionalHeaders: ['X-Requested-With']
            }
            //cors: true
        }
    }
});
server.connection({ port: 8000 });

/*
  TODO:
    - rx-dom fromWebSocket nu merge cu Socket.io -
    daca vreau socket.io trebuie sa rescriu metoda in asa fel incat sa
    foloseasca API-ul socket.io-client
    - http://www.jayway.com/2015/04/13/600k-concurrent-websocket-connections-on-aws-using-node-js/
    socket.io e ceva mai lent se pare
*/

// http://matt-harrison.com/using-hapi-js-with-socket-io/
// That listener object is a node http (or https) server.
// var listener = server.listener;
// var io = require('socket.io')(listener);
// io.on('connection', function (socket) { // message in loc de connection?
//     socket.emit('Oh hii!');
//
//     socket.on('burp', function () {
//         socket.emit('Excuse you!');
//     });
// });

// cu websocket library in loc de socket.io
// var WebSocketServer = require('websocket').server;
// var wsServer = new WebSocketServer({
//     httpServer: server.listener,
//     // You should not use autoAcceptConnections for production
//     // applications, as it defeats all standard cross-origin protection
//     // facilities built into the protocol and the browser.  You should
//     // *always* verify the connection's origin and decide whether or not
//     // to accept it.
//     autoAcceptConnections: false
// });
//
// wsServer.on('request', function(request) {
//
//   var connection = request.accept('echo-protocol', request.origin);
//   console.log((new Date()) + ' Connection accepted.');
//
//   connection.sendUTF('te-ai conectat!!');
//   connection.sendUTF('mesaj1');
//   connection.sendUTF('mesaj2');
//   connection.on('message', function(message) {
//     if (message.type === 'utf8') {
//       console.log('Hey!! Received Message: ' + message.utf8Data);
//       connection.sendUTF(message.utf8Data);
//     } else if (message.type === 'binary') {
//       console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
//       connection.sendBytes(message.binaryData);
//     }
//   });
//   connection.on('close', function(reasonCode, description) {
//     console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
//   });
// });


// cu ws - fastest WS for Node.js
// http://www.jayway.com/2015/04/13/600k-concurrent-websocket-connections-on-aws-using-node-js/
var WSServer = require('ws').Server
  // pass the server.listener (pointer to the low level node/http)
  , wss = new WSServer({ server: server.listener });

wss.on('connection', function connection(ws) {
  console.log((new Date()) + ' WS Connection accepted.');
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

// append all defined routes into an array passed to server.route()
var routes = Array.prototype.concat.apply([], [
    routes
]);
server.route(routes);

// good is a process monitor that listens for one or more 'event types'.
// All of these events, except 'ops', map to a hapi event
// (https://github.com/hapijs/hapi/blob/master/API.md#server-events)
var goodOptions = {
    opsInterval: 10000,
    reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*', request: '*'}
    }, {
        reporter: require('good-file'),
        events: { log: '*', response: '*' },
        config: './log-hapi-server.json'
    }]
};

// TV is a simple web page in which developers can view server logs for their requests.
// Optionally, they can also filter the server logs to just their requests by attaching a
// unique client id to each request. The server will use WebSocket to stream the logs to
// the web application in real-time.
// server.register([Tv, {
server.register([{
    register: require('good'),
    options: goodOptions
}], function (err) {

    /*
     * The if (!module.parent) {…} conditional makes sure that if the script is being
     * required as a module by another script, we don’t start the server. This is done
     * to prevent the server from starting when we’re testing it; with Hapi, we don’t
     * need to have the server listening to test it.
     * */
    if (!err && !module.parent) {
      if (!err) {
          server.start(function () {
              console.log('hapi.js server running at:', server.info.uri);
          });
      }
    }
});

// server.start(function () {
//     console.log('hapi.js server running at:', server.info.uri);
// });

module.exports = server;
