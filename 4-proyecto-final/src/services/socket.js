import server from './server'
import io from "socket.io"

const webSocketServer = io(server)
webSocketServer.on('connection', (socket) => {
    console.log('Client connected');
    console.log('Id socket server', socket.id);
    console.log('Id socket client', socket.client.id);

    socket.on('chat', data => {
        socket.broadcast.emit('response-chat', JSON.stringify(data))
    })

})

module.exports = webSocketServer