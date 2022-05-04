const express = require('express')
const http = require('http')
const path = require('path')
const io = require('socket.io')
const app = express()


const PORT = 8080
const myServer = http.Server(app)
myServer.listen(PORT, () => console.log(`Server listen in port ${PORT}`))


app.use(express.static('public'))
const publiPath = path.resolve(__dirname, '../public')
app.use('/public', express.static(publiPath))

const myWebSocketServer = io(myServer)

//Escucha la coneccion al sever
myWebSocketServer.on('connection', (socket) => {
    console.log('Client connected');
    console.log('Id socket server', socket.id);
    console.log('Id socket client', socket.client.id);

    //Escucho el evento del cliente (el parametro 'notification' es el nombre de el emit en el cliente )
    socket.on('notification', (data) => {
        console.log(`Client ${socket.client.id} send: ${data}`);

        //Server response la notificacion al cliente
        socket.emit('response', {msg: 'Ok'})

        //Server responde a todos los clientes salvo al que envio el mensaje
        //socket.broadcast.emit('response', {msg: 'Ok'})

        //Server le responde a todos los conectados
        //myWebSocketServer.emit('response', data)


        //Evio a un cliene especifico
        //const client = "id de algun cliente"
        //myWebSocketServer.to(client).emit('response', data)
    })


})