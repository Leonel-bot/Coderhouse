const socketChat = io.connect()

const formChat = document.getElementById("chat-form")
const listChat = document.getElementById("list-chat")


formChat.addEventListener("submit", (ev) => {
    ev.preventDefault()
    const data = {
        email: ev.target[0].value,
        message: ev.target[1].value,
        date: new Date(Date.now()).toLocaleString()
    }
    createMessage(data).then(res => {

        socketChat.emit('chat', data)
        addChatElement(data)
        formChat.reset()
    })
    
})

socketChat.on('response-chat', (data) => {
    addChatElement(JSON.parse(data))
})



const createMessage = (body) => {
    const headers = new Headers()
    headers.append("content-type", "application/json")
    const request = {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(body)
    }
    return fetch("http://localhost:8080/api/chat", request)
        .then(response => response.json())
        .catch(err => console.log(err))
}


const addChatElement = (d) => {
    const {email, message, date } = d
    const li = document.createElement('li');
    const el = `<div>
                    <span class="chat_email">${email}</span>
                    <span class="chat_date">${date}:</span>
                    <span class="chat_message">${message}</span>
                </div>`
    li.innerHTML = el;
    listChat.appendChild(li);
}