const express = require('express')
const path = require('path')
const app = express()
 

const PORT = 8080
app.listen(PORT,() => {
    console.log(`Server listen in port ${PORT}`);
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const publiPath = path.resolve(__dirname, '../public')
app.use('/public',express.static(publiPath))





module.exports = app