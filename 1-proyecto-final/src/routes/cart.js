const express = require('express')
const { CartController } = require('../Controller/Cart')

const cartRouter = express.Router()


cartRouter.get('/', (req, res) => {
    CartController.getAll().then(r => {
        res.json(r)
    }).catch(error => {
        res.status(400).send(error.message)
    })
})

cartRouter.post('/', (req, res) => {
    const data = {products: []}
    CartController.save(data).then(r => {
        res.json(r)
    }).catch(error => {
        res.status(400).send(error.message)
    })
})

cartRouter.delete('/:id', (req, res) => {
    const {id} = req.params
    CartController.deleteById(id).then(r => {
        res.json(r)
    }).catch(error => {
        res.status(400).send(error.message)
    })
})

cartRouter.get('/:id/productos', (req, res) => {
    const {id} = req.params
    CartController.getProducts(id).then(r => {
        res.json(r)
    }).catch(error => {
        res.status(400).send(error.message)
    })
})

cartRouter.post('/:id/productos', (req, res) => {
    const {id} = req.params
    const {products} = req.body
    CartController.addProducts(id, products).then(r => {
        res.json(r)
    }).catch(error => {
        res.status(400).send(error.message)
    })
})

cartRouter.delete('/:id/productos/:id_prod', (req, res) => {
    const {id, id_prod} = req.params
    CartController.removeProduct(id, id_prod).then(r => {
        res.json(r)
    }).catch(error => {
        res.status(400).send(error.message)
    })
})


module.exports = cartRouter