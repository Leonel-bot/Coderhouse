const express = require("express")
const router = express.Router()

const routerMacotas = require('./mascota')
const routerPersonas = require('./persona')


router.use('/mascotas', routerMacotas)
router.use('/personas', routerPersonas)

module.exports = router