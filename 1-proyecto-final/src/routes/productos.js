const express = require('express')
const productsRouter = express.Router()
const { ProductController }  = require('../Controller/Products')



const ADMIN = true

const isAdmin = (req, res, next) => {
    ADMIN ? next() : res.status(401).send(`Error ${req.url} no autorizada`);
}



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

productsRouter.post('/', isAdmin, (req, res) => {
    const { name, description, code, price, stock, image } = req.body
    const newProduct = {name, description, code, price, stock, image}
    ProductController.save(newProduct).then(r => {
        res.json(r)
    }).catch(error => {
        res.status(400).send(error.message)
    })

})

productsRouter.put('/:id', isAdmin, (req, res) => {
    const {id} = req.params
    const { name, description, code, price, stock, image } = req.body
    const newProduct = {name, description, code, price, stock, image}
    ProductController.edit(Number(id), newProduct).then(r => {
        res.json(r)
    }).catch(error => {
        res.status(400).send(error.message)
    })
})


productsRouter.delete('/:id', isAdmin, (req, res) => {
    const {id} = req.params
    ProductController.deleteById(id).then(r => {
        res.json(r)
    }).catch(error => {
        res.status(400).send(error.message)
    })
})


module.exports = productsRouter