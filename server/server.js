const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(express.static( path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
      from: 'mike@example.com',
      text: 'Hey, how is everything?',
      createdAt: 123
  });

  socket.on('createMessage', function(message) {
    console.log('Create Message: ', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
})
