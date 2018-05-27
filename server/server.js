const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const port = process.env.PORT || 3000;

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(express.static( path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.emit('newMessage', generateMessage('admin', 'Welcome to chat app'));

  socket.broadcast.emit('newMessage', generateMessage('admin', 'New user joined'));

  socket.on('createMessage', (message) => {
    console.log('Create Message: ', message);

    io.emit('newMessage', generateMessage(message.from, message.text));

  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
})
