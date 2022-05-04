const socketChat = io.connect()

const formChat = document.getElementById("chat-form")
const listChat = document.getElementById("list-chat")


formChat.addEventListener("submit", (ev) => {
    ev.preventDefault()
    const data = {
        email: ev.target[0].value,
        message: ev.target[1].value,
    }
    socketChat.emit('chat', data)
    //addChatElement(data)
    formChat.reset()
})

socketChat.on('response-chat', (data) => {
    console.log(data);
    addChatElement(JSON.parse(data))
})

const addChatElement = (d) => {
    const {email, message, created_at } = d
    const li = document.createElement('li');
    const el = `<div>
                    <span class="chat_email">${email}</span>
                    <span class="chat_date">${created_at}:</span>
                    <span class="chat_message">${message}</span>
                </div>`
    li.innerHTML = el;
    listChat.appendChild(li);
}