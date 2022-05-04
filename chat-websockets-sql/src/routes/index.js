const express = require('express')
const router = express.Router()
const productsRouter = require('./productos')


router.use('/productos', productsRouter)



module.exports = router


