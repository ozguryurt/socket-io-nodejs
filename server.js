const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', (socket) => {
    console.log(`A user connected. Socket ID: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`A user disconnected. Socket ID: ${socket.id}`);
    });

    socket.on('sendMessage', (msg) => {
        io.emit('sendMessage', msg);
    });
});

server.listen(3000, () => {
    console.log('Server listening on localhost:3000');
});