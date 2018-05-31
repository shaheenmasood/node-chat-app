const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const port = process.env.PORT || 3000;

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(express.static( path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('Create Message: ', message);

    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from server.');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
})
