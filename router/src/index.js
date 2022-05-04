const path = require('path')
const app = require('../server')
const express = require('express')
const mainRouter = require('../routes/index')

app.use('/api', mainRouter)


//Carpeta con los estaticos
const publicFolderPath = path.resolve(__dirname, '../public')
app.use(express.static(publicFolderPath))