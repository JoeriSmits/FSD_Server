const net = require('net');

var clients = [];

const server = net.createServer((socket) => {
  clients.push(socket);

  socket.on('data', (data) => {
    console.log('Received: ' + data);
    broadcast(data, socket);
  });

  socket.on("error", (err) => {
    console.log("Caught flash policy server socket error");
  });

  // Remove the client from the list when it leaves
  socket.on('end', () => {
    clients.splice(clients.indexOf(socket), 1);
  });

  // Send a message to all clients
  function broadcast(message, sender) {
    clients.forEach((client) => {
      // Don't want to send it to sender
      if (client === sender) return;
        client.write(message);
    });
  }
});

server.listen(6809);
