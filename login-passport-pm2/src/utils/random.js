const randomNumber = (cantidad) => {
    let response = []
    for (let i = 0; i < cantidad; i++) {
        response.push(parseInt(Math.random() * (10 - 1) + 1))
    }
    return response
}


process.on('message' , (cantidad) => {
    const response = randomNumber(cantidad)
    console.log(`Start calculo in procces id ${process.pid}`);
    process.send(response)
})