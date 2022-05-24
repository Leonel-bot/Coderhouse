const socket = io.connect()

const text = document.getElementById('message').value
const id = document.getElementById('email').value
const form = document.getElementById('chat-form')
form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    console.log('submit');
    console.log(text, id);
})
/* socketChat.on('response-chat', (data) => {
    console.log(data);
    addChatElement(JSON.parse(data))
}) */

/* const author = {
    id,
    nombre: faker.name.firstName(),
    apellido: faker.name.lastName(),
    edad: faker.finance.amount(18, 100),
    alias: faker.name.firstName(),
    avatar: faker.image.avatar()
} */