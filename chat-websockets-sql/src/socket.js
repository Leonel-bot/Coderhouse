const {server} = require('./server')
const {ChatController} = require('./Controller/Chat')
const { DateTime } = require("luxon");
const io = require('socket.io')

const webSocketServer = io(server)
webSocketServer.on('connection', (socket) => {
    console.log('Client connected');
    console.log('Id socket server', socket.id);
    console.log('Id socket client', socket.client.id);

    socket.on('add_product', (data) => {
        socket.broadcast.emit('response', JSON.stringify(data))
    })

    socket.on('chat', data => {
        ChatController.save(data)
        const chat = {...data, created_at: DateTime.now().toFormat('y-LL-dd TT')}
        webSocketServer.emit('response-chat', JSON.stringify(chat))
    })

})

module.exports = webSocketServer