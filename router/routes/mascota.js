const express = require('express')
const routerMacotas = express.Router()

routerMacotas.get('/', (req, res) => {
    res.json({
        msg: 'masco'
    })
})

module.exports = routerMacotas