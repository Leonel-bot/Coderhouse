const express = require('express')
const router = express.Router()
const productsRouter = require('./productos')
const cartRouter = require('./cart')


router.use('/productos', productsRouter)
router.use('/carrito', cartRouter)



module.exports = router


