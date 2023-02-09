const http = require('node:http');
const express = require('express');
const {Server} = require('socket.io');

const app = express();

const server = http.createServer(app)

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('user connected on socket')
    socket.on('chat-message', (msg) => {
        io.emit('chat-message', msg)
    })
    socket.on('typing', () => {
        socket.broadcast.emit('typing', 'user is typing')
    })
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(5000, () => console.log('port listening on 5000'));