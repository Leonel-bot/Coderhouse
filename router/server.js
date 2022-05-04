const express = require('express')

const mainRouter = require('./routes/index')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))


const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server listen in port ${PORT}`);
})

module.exports = app