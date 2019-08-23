const express = require ('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const socket = require('socket.io');
const cors = require('cors');
const keys = require('./config/keys');
const message = require('./model/message');

const app = new express();
app.use(bodyParser.json())
app.use(cors())

var server = app.listen(5000, () => {
    console.log('Running at Port 5000')
})

// Connecting Mongo DB

mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
mongoose.connection.on('error', () => {
    console.log('Error in database connection');
})
mongoose.connection.once('open', function() {
    console.log('DB connection established')
})

// Setting up socket.io

let io = socket(server);

io.on('connection', function(socket) {
    console.log('Socket connection established with id: ' + socket.id)

    socket.on('chat', async function(chat) {
        chat.created = new Date()
        let response = await new message(chat).save()

        socket.emit('chat', chat)
    })
})

app.get('/chat', async (req, res) => {
    let result = await message.find()
    res.send(result)
})
