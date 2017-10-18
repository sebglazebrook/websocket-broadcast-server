const WebSocket = require('ws');

console.log("Starting server on port 6969")
const wss = new WebSocket.Server({ port: 6969 });

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
    console.log("received message: ", data);
    wss.clients.forEach(function each(client) {
      console.log("sending message to client: ", client);
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        console.log("did it get here??");
        client.send(data);
      }
    });
  });
});
