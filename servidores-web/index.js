const http = require('http')


const server = http.createServer((request, response) => {
    const fecha = new Date()
    const hour = fecha.getHours()

    let message = 'Buenos dias'
    if(hour >= 13 && hour <= 19){
        message = `Buenas tardes`
    }
    if(hour >= 20 || hour <= 5){
        message = 'Buenas noches'
    }
    response.end(message)
})


const PORT = 8080
const connectServer = server.listen(PORT, () => {
    console.log(`server listen in port ${PORT}`);
})

