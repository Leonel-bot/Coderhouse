const express = require('express')
const router = express.Router()
const productsRouter = require('./productos')
const chatRouter = require('./chats')


router.use('/productos', productsRouter)
router.use('/chat', chatRouter)



module.exports = router


