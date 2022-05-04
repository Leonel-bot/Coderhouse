const express = require('express')
const router = express.Router()
const productoRouter = require('./productos')


router.use('/productos', productoRouter)



module.exports = router


