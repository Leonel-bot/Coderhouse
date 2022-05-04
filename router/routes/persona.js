const express = require('express')
const routerPersonas = express.Router()

routerPersonas.get('/', (req, res) => {
    res.json({
        msg: "Personas"
    })
})

module.exports = routerPersonas