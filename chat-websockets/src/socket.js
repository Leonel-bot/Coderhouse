const {server} = require('./server')
const io = require('socket.io')

const webSocketServer = io(server)
webSocketServer.on('connection', (socket) => {
    console.log('Client connected');
    console.log('Id socket server', socket.id);
    console.log('Id socket client', socket.client.id);

    socket.on('add_product', (data) => {
        //Server response la notificacion al cliente
        socket.broadcast.emit('response', JSON.stringify(data))

        //Server responde a todos los clientes salvo al que envio el mensaje
        //socket.broadcast.emit('response', {msg: 'Ok'})

        //Server le responde a todos los conectados
        //myWebSocketServer.emit('response', data)


        //Evio a un cliene especifico
        //const client = "id de algun cliente"
        //myWebSocketServer.to(client).emit('response', data)
    })

    socket.on('chat', data => {
        socket.broadcast.emit('response-chat', JSON.stringify(data))
    })

})

module.exports = webSocketServer