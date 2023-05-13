const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bodyParser = require('body-parser')
const mime = require('mime');
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public', {
  setHeaders: (res, path) => {
    if (mime.getType(path) === 'application/javascript') {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

io.on('connection', (socket) => {
  console.log('A user has connected, id:', socket.id);
  io.emit('user_connected', 'Welcome to the server!');
  io.emit('greeting from server', {greeting: 'Welcome to the server!'})

  socket.on('chat message', (data) => {
    console.log('Received message:', data);
    io.emit('chat message', data); // Broadcast the message to all connected clientss
    io.broadcast.emit('chat message', data); // Broadcast the message to only the other connected clients 
  });




  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id);
  });
});

app.get('/game', (req, res) => {
  res.sendFile('game.html', { root: __dirname + '/public' });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
