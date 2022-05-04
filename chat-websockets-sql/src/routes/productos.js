const express = require('express')
const productsRouter = express.Router()
const { ProductController }  = require('../Controller/Products')
const path = require('path')





productsRouter.get('/', ( req, res ) => {
    ProductController.getAll().then(r => {
        res.json(r)
    }).catch(error => {
        res.status(400).send(error.message)
    })
})

productsRouter.get('/:id', ( req, res ) => {
    const {id} = req.params
    ProductController.getById(id).then(r => {
        res.json(r)
    }).catch(error => {
        res.status(400).send(error.message)
    }) 
})

productsRouter.post('/', (req, res) => {
    ProductController.save(req.body).then(r => {
        res.json(r)
    }).catch(error => {
        res.status(400).send(error.message)
    })

})

productsRouter.put('/:id', (req, res) => {
    const {id} = req.params   
    ProductController.edit(Number(id), req.body).then(r => {
        res.json(r)
    }).catch(error => {
        res.status(400).send(error.message)
    })
})


productsRouter.delete('/:id', (req, res) => {
    const {id} = req.params
    ProductController.deleteById(id).then(r => {
        res.json(r)
    }).catch(error => {
        res.status(400).send(error.message)
    })
})


module.exports = productsRouter