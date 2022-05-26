const socket = io.connect()

const listChat = document.getElementById("list-chat")
const message = document.getElementById('message')
const email = document.getElementById('email')
const form = document.getElementById('chat-form')
form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    const data = {id: email.value, text: email.value}
    socket.emit('chat', data)
    form.reset()
})


socket.on('response-chat', (data) => {
    const chats = denormalizrChats(JSON.parse(data))
    addChatElement(chats[chats.length-1])  
})

const addChatElement = (data) => {
    const chat = data._doc
    const li = document.createElement('li');
    console.log(li);
    const el = `<div>
                    <span class="chat_email">${chat.author.nombre}</span>
                    <span class="chat_date">${chat.createdAt}:</span>
                    <span class="chat_message">${chat.text}</span>
                </div>`
    li.innerHTML = el;
    listChat.appendChild(li);
}


const normalizrChats = (data) => {

    const author = new normalizr.schema.Entity('authors', {}, {
        idAttribute: 'email'
    })

    const chat = new normalizr.schema.Entity('chats', {
        author: author
    })

    const finalSchema = [chat]
    return normalize(data, finalSchema)
}


const denormalizrChats = (data) => {
    const author = new normalizr.schema.Entity('authors', {}, {
        idAttribute: 'email'
    })

    const chat = new normalizr.schema.Entity('chats', {
        author: author
    })
    const finalSchema = [chat]
    return normalizr.denormalize( data.result, finalSchema, data.entities);
}