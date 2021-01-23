const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors");

const app = express();
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

const connectedUsers = {}
io.on('connection', socket => {
    const { user } = socket.handshake.query;
    connectedUsers[user] = socket.id;
});

mongoose.connect('mongodb+srv://adm:adm123@cluster0.6vjor.mongodb.net/DropboxClone?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(3333);