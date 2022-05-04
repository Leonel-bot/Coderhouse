const express = require('express')
const http = require('http')
const path = require('path')
const app = express()
 

const PORT = 8080
const server = http.Server(app)
server.listen(PORT, () => console.log(`Server listen in port ${PORT}`))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const publiPath = path.resolve(__dirname, '../public')
app.use('/public',express.static(publiPath))

app.set('view engine', 'ejs')
const viewsPath = path.resolve(__dirname, '../views')
app.set('views', viewsPath)



module.exports = {app, server}