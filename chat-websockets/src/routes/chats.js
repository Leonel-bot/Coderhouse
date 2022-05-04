const express = require('express')
const path = require('path')
const { ChatController } = require('../Controller/Chat') 

const chatRouter = express.Router()


chatRouter.get('/', (req, res) => {
    ChatController.getAll().then(response => {
        res.json(response)
    }).catch(error =>  res.status(400).send(error.message))
})

chatRouter.post('/', (req, res) => {
    const {email, message, date} = req.body
    const newMessage = {email, message, date}
    ChatController.save(newMessage).then(response => {
        res.json(response)
    }).catch(errro => res.status(400).send(error.message))
})

module.exports = chatRouter