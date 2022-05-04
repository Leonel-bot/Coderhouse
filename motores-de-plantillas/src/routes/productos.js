const express = require('express')
const multer = require('multer')
const productsRouter = express.Router()
const { ProductController }  = require('../Controller/Products')
const path = require('path')



const folderUpload = path.resolve(__dirname, '../../public/uploads')
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, folderUpload)
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({dest: folderUpload, storage})


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

productsRouter.post('/', upload.single('imagen'), (req, res) => {
    const {title, price} = req.body
    const file = req.file
    if(!file){
        const error = new Error('La imagen es requerida')
        res.status(400).json({error: error.message})
    }
    const thumbnail = `http://localhost:8080/public/uploads/${file.filename}`
    const newProduct = {title, price, thumbnail}
    ProductController.save(newProduct).then(r => {
        res.redirect('/')
    }).catch(error => {
        res.status(400).send(error.message)
    })

})

productsRouter.put('/:id', upload.single('imagen'), (req, res) => {
    const {id} = req.params
    const {title, price} = req.body
    const file = req.file
    const thumbnail = `http://localhost:8080/public/uploads/${file.filename}`
    const newProduct = {title, price, thumbnail}
    ProductController.edit(Number(id), newProduct).then(r => {
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