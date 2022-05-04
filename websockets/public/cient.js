console.log('Client');
const socket = io.connect()


const form = document.getElementById('form')
form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    //Mensaje
    let message = ev.target[0].value

    socket.emit('notification', message)
    message = ""

})

//Escucho la respuesta del servidor
socket.on('response', (data) => {
    alert(`${JSON.stringify(data)}`)
})