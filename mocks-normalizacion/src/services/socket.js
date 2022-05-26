import server from './server'
import { faker } from '@faker-js/faker';
import io from 'socket.io'
import { getChat, normalizrChats, saveChat } from '../controller/chats';



const webSocketServer = io(server)
webSocketServer.on('connection', (socket) => {
    console.log('Client connected');
    console.log('Id socket server', socket.id);
    console.log('Id socket client', socket.client.id);

    socket.on('add_product', (data) => {
        socket.broadcast.emit('response', JSON.stringify(data))
    })

    socket.on('chat', async (data) => {
        const chats = await sendChat(data)
        const res = normalizrChats(chats)
        webSocketServer.emit('response-chat', JSON.stringify(res))
    })

})


const sendChat = async (data) => {
    const author = {
        email: data.id,
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        edad: faker.datatype.number(100),
        alias: faker.name.firstName(),
        avatar: faker.image.avatar()
    }
    const chat = {author, text: data.text}
    await saveChat(chat)
    const chats = await getChat();
    return chats
}